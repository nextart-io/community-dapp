module nextart_community::member;

use std::{
    string::{Self,String}
};
use sui::{
    table::{Self, Table},
    clock::{Self, Clock},
    event::emit,
    display,
    package,
    balance::{Self, Balance},
    coin::{Self, Coin},
    sui::SUI,
};
use nextart_community::version::{Version,OffChainValidator, check_version,off_chain_validation,create_off_chain_validator};

public struct MEMBER has drop {}

// ====== Errors =======
const ERROR_INVALID_VALIDATION: u64 = 0;

#[allow(unused_field)]
public struct Member has key {
    id: UID,
    name: String,
    avatar: String,
    introduction: String,
    collections: Table<String, ID>,
    points: u64,
    last_time: u64,
}

public struct MemberRecord has key {
    id: UID,
    record: Table<address, u64>,
    pool: Balance<SUI>,
}

public struct Receipt {
    amount: u64,
}

// ====== Events =======
public struct MintMemberEvent has copy, drop {
    sender: address,
    name: String,
    avatar: String,
    introduction: String,
    member: ID,
}

public struct DropMemberEvent has copy, drop {
    sender: address,
    member: ID,
}

public struct EditMemberEvent has copy, drop {
    sender: address,
    name: String,
    avatar: String,
    introduction: String,
    member: ID,
}

public struct UpdateMemberRecordEvent has copy, drop {
    addr: address,
    amount: u64,
    balance: u64,
    type_name: String,
}

fun init(otw: MEMBER, ctx: &mut TxContext) {
    let deployer = ctx.sender();
    let member_record = MemberRecord {
        id: object::new(ctx),
        record: table::new<address, u64>(ctx),
        pool: balance::zero<SUI>(),
    };
    transfer::share_object(member_record);

    let keys = vector[
        b"name".to_string(),
        b"avatar".to_string(),
        b"project_url".to_string(),
        b"introduction".to_string(),
    ];

    let mut image_url: vector<u8> = b"https://nextart.io/memberId/";
    image_url.append(b"{id}");
    let project_url: vector<u8> = b"https://nextart.io/";

    let values = vector[
        b"{name}".to_string(),
        image_url.to_string(),
        project_url.to_string(),
        b"{introduction}".to_string(),
    ];

    let publisher = package::claim(otw, ctx);
    let mut member_display = display::new_with_fields<Member>(
        &publisher,
        keys,
        values,
        ctx,
    );

    member_display.update_version();
    transfer::public_transfer(publisher, deployer);
    transfer::public_transfer(member_display, deployer);
}

public fun Pay(record: &mut MemberRecord, coin: Coin<SUI>, ctx: &mut TxContext): Receipt {
    let value = coin::value(&coin);
    balance::join(&mut record.pool, coin::into_balance(coin));
    let receipt = Receipt {
        amount: value,
    };
    emit(UpdateMemberRecordEvent {
        addr: ctx.sender(),
        amount: 0,
        balance: value,
        type_name: string::utf8(b"payment"),
    });
    receipt
}

public fun mint_member(
    record: &mut MemberRecord,
    sig: vector<u8>,
    name: String,
    avatar: String,
    introduction: String,
    version: &Version,
    clock: &Clock,
    receipt: Receipt,
    ctx: &mut TxContext,
) {
    check_version(version);
    assert!(off_chain_validation<address>(sig, ctx.sender()), ERROR_INVALID_VALIDATION);
    let sender = ctx.sender();
    let Receipt { amount } = receipt;
    table::add<address, u64>(&mut record.record, sender, amount);
    let member = Member {
        id: object::new(ctx),
        name,
        avatar,
        introduction,
        collections: table::new<String, ID>(ctx),
        points: 0,
        last_time: clock::timestamp_ms(clock),
    };
    emit(MintMemberEvent {
        sender,
        name,
        avatar,
        introduction,
        member: object::id(&member),
    });
    transfer::transfer(member, sender);
}

public fun drop_member(
    record: &mut MemberRecord,
    member: Member,
    version: &Version,
    ctx: &mut TxContext,
) {
    let sender = ctx.sender();
    check_version(version);
    table::remove<address, u64>(&mut record.record, sender);

    emit(DropMemberEvent {
        sender,
        member: object::id(&member),
    });
    let Member {
        id,
        collections,
        ..,
    } = member;
    object::delete(id);
    table::drop<String, ID>(collections);
}

public fun edit_member(
    member: &mut Member,
    mut name: Option<String>,
    mut avatar: Option<String>,
    mut introduction: Option<String>,
    sig: vector<u8>,
    version: &Version,
    clock: &Clock,
    ctx: &TxContext,
) {
    check_version(version);
    let off_chain_validator = create_off_chain_validator(member.last_time, ctx);
    assert!(
        off_chain_validation<OffChainValidator>(sig, off_chain_validator),
        ERROR_INVALID_VALIDATION,
    );
    if (name.is_some()) {
        member.name = option::extract(&mut name);
    };
    if (avatar.is_some()) {
        member.avatar = option::extract(&mut avatar);
    };
    if (introduction.is_some()) {
        member.introduction = option::extract(&mut introduction);
    };
    member.last_time = clock::timestamp_ms(clock);

    emit(EditMemberEvent {
        sender: ctx.sender(),
        name: member.name,
        avatar: member.avatar,
        introduction: member.introduction,
        member: object::id(member),
    });
}

public fun points(member: &Member): u64 {
    member.points
}

public fun points_member_record(record: &mut MemberRecord, ctx: &TxContext): &u64 {
    let sender = ctx.sender();
    assert!(table::contains<address, u64>(&record.record, sender), ERROR_INVALID_VALIDATION);
    table::borrow(&record.record, sender)
}

public fun add_points(
    member: &mut Member,
    version: &Version,
    sig: vector<u8>,
    amount: u64,
    clock: &Clock,
    ctx: &TxContext,
) {
    check_version(version);
    let off_chain_validator = create_off_chain_validator(member.last_time, ctx);
    assert!(
        off_chain_validation<OffChainValidator>(sig, off_chain_validator),
        ERROR_INVALID_VALIDATION,
    );
    let points = &mut member.points;
    *points = *points + amount;
    member.last_time = clock::timestamp_ms(clock);
    emit(UpdateMemberRecordEvent {
        addr: ctx.sender(),
        amount,
        balance: 0,
        type_name: string::utf8(b"add_points"),
    });
}

public fun update_points(
    record: &mut MemberRecord,
    member: &Member,
    version: &Version,
    ctx: &TxContext,
) {
    check_version(version);
    assert!(table::contains<address, u64>(&record.record, ctx.sender()), ERROR_INVALID_VALIDATION);
    let points = &mut record.record[ctx.sender()];
    *points = points(member);
}

#[test_only]
public fun init_for_testing(ctx: &mut TxContext) {
    init(MEMBER {}, ctx)
}

#[test_only]
public fun mint_member_for_testing(
    record: &mut MemberRecord,
    name: String,
    avatar: String,
    introduction: String,
    version: &Version,
    clock: &Clock,
    receipt: Receipt,
    ctx: &mut TxContext,
) {
    check_version(version);
    let sender = ctx.sender();
    let Receipt { amount } = receipt;
    table::add<address, u64>(&mut record.record, sender, amount);
    let member = Member {
        id: object::new(ctx),
        name,
        avatar,
        introduction,
        collections: table::new<String, ID>(ctx),
        points: 0,
        last_time: clock::timestamp_ms(clock),
    };
    emit(MintMemberEvent {
        sender,
        name,
        avatar,
        introduction,
        member: object::id(&member),
    });
    transfer::transfer(member, sender);
}
#[test_only]
public fun edit_member_for_testing(
    member: &mut Member,
    mut name: Option<String>,
    mut avatar: Option<String>,
    mut introduction: Option<String>,
    version: &Version,
    clock: &Clock,
    ctx: &TxContext,
) {
    check_version(version);
    // 测试版本跳过签名验证
    if (name.is_some()) {
        member.name = option::extract(&mut name);
    };
    if (avatar.is_some()) {
        member.avatar = option::extract(&mut avatar);
    };
    if (introduction.is_some()) {
        member.introduction = option::extract(&mut introduction);
    };
    member.last_time = clock::timestamp_ms(clock);

    emit(EditMemberEvent {
        sender: ctx.sender(),
        name: member.name,
        avatar: member.avatar,
        introduction: member.introduction,
        member: object::id(member),
    });
}
#[test_only]
public fun add_points_for_testing(
    member: &mut Member,
    version: &Version,
    amount: u64,
    clock: &Clock,
    ctx: &TxContext,
) {
    check_version(version);
    let points = &mut member.points;
    *points = *points + amount;
    member.last_time = clock::timestamp_ms(clock);
    emit(UpdateMemberRecordEvent {
        addr: ctx.sender(),
        amount,
        balance: 0,
        type_name: string::utf8(b"add_points"),
    });
}
