interface ContractAddresses {
    [key: string]: string;
}

type NetworkType = 'testnet' | 'mainnet';

// transaction hash: G9W5meMr3qAEjMyvDrAzx1Sba2wKzYDtSV6YQPWFu8PF
const configs = {
    testnet: {
        Package: "0xb27c133de3234cce2285c9502d96f6f240e69417c316b2e2c06c2e1cc06c0ce9",
        MemberRecord: "0x2d506cdeee7ce3d39b15086f5651df9611a8c18d2065105b8f514126201d9a37",
        Version: "0x5a6048c01084b40678a13b18823ac7d40e79ae45b30baefc721d5a8a556c7ecb",
        RuleCap: "0xb8744f151025c438c205b5ec1a109ba9e289c31c072b01193ff9c289ba3900ef",
        Rule: "0xc5813d8c8d4420de8b744a8f191f3dc48a3a2d76a5346d87ed3a7d02a7bf92ca",
    },
    mainnet: {
        Package: "0x1111111111111111111111111111111111111111",
    }
} as const satisfies Record<NetworkType, ContractAddresses>;

export function getContractConfig(network: NetworkType): ContractAddresses {
    return configs[network];
}