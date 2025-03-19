module nextart_community::member;

use std::{
    string::String
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
use nextart_community::version::{Version, check_version};
use nextart_community::rule::{is_valid_rule, Rule};
public struct MEMBER has drop {}

// ====== Errors =======
 const EInvalidRule: u64 = 0;
fun err_invalid_rule() { abort EInvalidRule }

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

public struct PaymentEvent has copy, drop {
    sender: address,
    amount: u64,
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

public fun Pay(
    record: &mut MemberRecord,
    coin: Coin<SUI>,
    ctx: &mut TxContext,
): Receipt {
    let value = coin::value(&coin);
    balance::join(&mut record.pool, coin::into_balance(coin));
    let receipt = Receipt {
        amount: value,
    };
    emit(PaymentEvent {
        sender: ctx.sender(),
        amount: value,
    });
    receipt
}

public fun mint_member<R: drop>(
    record: &mut MemberRecord, 
    rule: &Rule,
    name: String,
    avatar: String,
    introduction: String,
    version: &Version,
    clock: &Clock,
    kind: u8,
    receipt: Receipt,
    ctx: &mut TxContext
) {
    check_version(version);
    let sender = ctx.sender();
    if (!is_valid_rule<R>(rule, kind)) {    
        err_invalid_rule();
    };
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
    ctx: &mut TxContext
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
        ..
    } = member;
    object::delete(id);
    table::drop<String, ID>(collections);
}

public fun edit_member(
    member: &mut Member,
    mut name: Option<String>,
    mut avatar: Option<String>,
    mut introduction: Option<String>,
    version: &Version,
    clock: &Clock,
    ctx: &TxContext
) {
    check_version(version);
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


public(package) fun set_last_time(member: &mut Member, clock: &Clock) {
    member.last_time = clock::timestamp_ms(clock);
}

public fun points(member: &Member): u64 {
    member.points
}

public fun last_time(member: &Member): u64 {
    member.last_time
}

public fun add_points<R: drop>(
    member: &mut Member,
    version: &Version,
    amount: u64,
    rule: &Rule,
    kind: u8,
) {
    check_version(version);
    if (!is_valid_rule<R>(rule, kind)) {    
        err_invalid_rule();
    }; 
    let points = &mut member.points;
    *points = *points + amount;
}

public fun update_points(
    record: &mut MemberRecord, 
    member: &Member,
    version: &Version,
    ctx: &TxContext
) {
    check_version(version);
    let points = &mut record.record[ctx.sender()];
    *points = points(member);
}