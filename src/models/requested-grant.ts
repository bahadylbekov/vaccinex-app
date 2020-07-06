export class RequestedGrant {
    grant_id: string;
    alice_ethereum_account: string;
    alice_nucypher_account_address: string;
    alice_nucypher_account_name: string;
    bob_ethereum_account: string;
    bob_nucypher_account_address: string;
    bob_nucypher_account_name: string;
    token_id: number;
    label: string;
    hash_key: string;
    receipt_id: number;
    is_active: boolean;
    policy_id: number;
    created_by: string;
    created_at: string;
}