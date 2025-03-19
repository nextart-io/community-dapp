module nextart_community::rule;

    // Dependencies

use std::type_name::{Self, TypeName};
use sui::{
    vec_map::{Self, VecMap},
};
// Object

public struct Rule has key {
    id: UID,
    rules: VecMap<u8, TypeName>,
}
// Capability

public struct RuleCap has key, store {
    id: UID,
}

// Constructor

fun init(ctx: &mut TxContext) {
    let rule = Rule {
        id: object::new(ctx),
        rules: vec_map::empty(),
    };
    transfer::share_object(rule);    

    let cap = RuleCap {
        id: object::new(ctx),
    };
    transfer::transfer(cap, ctx.sender());
}

// Admin Funs

public fun add_rule<R: drop>(
    _cap: &RuleCap,
    rule: &mut Rule,
    kind: u8,
) {
    vec_map::insert(
        &mut rule.rules,
        kind,
        type_name::get<R>(),
    );
}

public fun remove_rule(
    _cap: &RuleCap,
    rule: &mut Rule,
    kind: u8
) {
    vec_map::remove(
        &mut rule.rules,
        &kind,
    );
}

// Getter Funs

public fun is_valid_rule<R: drop>(rule: &Rule, kind: u8): bool {
    if (vec_map::contains(&rule.rules, &kind)) {
        let rule_name = *vec_map::get(&rule.rules, &kind);
        rule_name == type_name::get<R>()
    } else {
        false
    }
}

// Test-only Funs

#[test_only]
public fun init_for_testing(ctx: &mut TxContext) {
    init(ctx);
}

#[test_only]
public fun add_rule_for_testing<R: drop>(
    rule: &mut Rule,
    kind: u8,
) {
    vec_map::insert(
        &mut rule.rules,
        kind,
        type_name::get<R>(),
    );   
}