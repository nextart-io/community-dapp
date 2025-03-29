#[test_only]
module nextart_community::member_tests;

use nextart_community::member::{Self, MemberRecord, Member};
use nextart_community::version;
use std::string;
use sui::clock as clock;
use sui::coin as coin;
use sui::sui::SUI;
use sui::test_scenario::{Self as test, Scenario, next_tx, ctx};

const ADMIN: address = @0x1;
const USER1: address = @0x2;

fun init_member(scenario: &mut Scenario) {
    next_tx(scenario, ADMIN);
    {
        member::init_for_testing(ctx(scenario));
        version::init_for_test(ctx(scenario));
    };
}
#[test]
fun test_member_initialization() {
    let mut scenario = test::begin(ADMIN);
    // 初始化会员系统
    init_member(&mut scenario);
    // 验证会员系统已创建
    next_tx(&mut scenario, ADMIN);
    {
        assert!(test::has_most_recent_shared<MemberRecord>(), 0);
    };
    test::end(scenario);
}

fun test_member_mint(
    record: &mut MemberRecord,
    version: &version::Version,
    clock: &clock::Clock,
    scenario: &mut Scenario,
) {
    // 用户支付并铸造会员
    next_tx(scenario, USER1);
    let payment = coin::mint_for_testing<SUI>(1000, ctx(scenario));
    let receipt = member::Pay(
        record,
        payment,
        ctx(scenario),
    );
    member::mint_member_for_testing(
        record,
        string::utf8(b"Test User"),
        string::utf8(b"avatar.png"),
        string::utf8(b"test introduction"),
        version,
        clock,
        receipt,
        ctx(scenario),
    );
}

fun test_member_edit(
    member: &mut Member,
    version: &version::Version,
    clock: &clock::Clock,
    scenario: &mut Scenario,
) {
    // 用户编辑会员信息
    next_tx(scenario, USER1);
    member::edit_member_for_testing(
        member,
        option::some(string::utf8(b"Test2 User")),
        option::some(string::utf8(b"avatar2.png")),
        option::some(string::utf8(b"test2 introduction")),
        version,
        clock,
        ctx(scenario),
    )
}

fun test_member_drop(
    record: &mut MemberRecord,
    member: Member,
    version: &version::Version,
    scenario: &mut Scenario,
) {
    // 用户销毁会员
    next_tx(scenario, USER1);
    member::drop_member(
        record,
        member,
        version,
        ctx(scenario),
    );
}

fun test_add_points(
    member: &mut Member,
    version: &version::Version,
    amount: u64,
    clock: &clock::Clock,
    scenario: &mut Scenario,
) {
    // 用户增加积分
    next_tx(scenario, ADMIN);
    member::add_points_for_testing(
        member,
        version,
        amount,
        clock,
        ctx(scenario),
    );
}

fun test_update_points(
    record: &mut MemberRecord,
    member: &Member,
    version: &version::Version,
    scenario: &mut Scenario,
) {
    // 用户更新积分
    next_tx(scenario, USER1);
    member::update_points(
        record,
        member,
        version,
        ctx(scenario),
    );
}

#[test]
fun test_member() {
    let mut scenario = test::begin(ADMIN);

    init_member(&mut scenario);
    next_tx(&mut scenario, ADMIN);

    { let maybe_member = test::has_most_recent_shared<MemberRecord>(); assert!(maybe_member, 2); };

    let mut record = test::take_shared<MemberRecord>(&scenario);
    let clock = clock::create_for_testing(ctx(&mut scenario));
    let version = test::take_shared<version::Version>(&scenario);
    // 铸造会员
    next_tx(&mut scenario, USER1);
    {
        next_tx(&mut scenario, USER1);

        test_member_mint(&mut record, &version, &clock, &mut scenario);
        next_tx(&mut scenario, USER1);

        // 铸造后从用户获取 Member 对象
        let mut member = test::take_from_sender<Member>(&scenario);
        assert!(member::points(&member) == 0, 0);

        test_member_edit(&mut member, &version, &clock, &mut scenario);

        next_tx(&mut scenario, ADMIN);
        {
            test_add_points(&mut member, &version, 100, &clock, &mut scenario);
            assert!(member::points(&member) == 100, 1);
            test_update_points(&mut record, &member, &version, &mut scenario);
            assert!(member::points_member_record(&mut record,ctx(&mut scenario)) == 100, 2);
        };
        next_tx(&mut scenario, USER1);

        test_member_drop(&mut record, member, &version, &mut scenario);
    };
    test::return_shared(record);
    test::return_shared(version);
    clock::destroy_for_testing(clock);
    // 验证会员系统已创建

    test::end(scenario);
}
