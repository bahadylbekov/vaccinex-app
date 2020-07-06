import { Time } from '@angular/common';

class NucypherCharacter {
    username: string;
    password: string;
}

class NucypherUsername {
    username: string;
}

class DecryptionRequest {
    username: string;
    receipt: Receipt;
    policy_info: Policy;
}

class EncryptionRequest {
    username: string;
    password: string;
    account: string;
    label: string;
    file: File;
}

class Grant {
    username: string;
    password: string;
    account: string;
    bob_username: string;
    label: any;
}

class Receipt {
    data_source_public_key: string;
    hash_key:               string;
}

class Policy {
    alice_sig_pubkey: string;
    label: string;
    policy_pubkey: string;
}

class NucypherAccount {
    account_id: number;
    name: string;
    organization_id: number;
    address: string;
    encrypting_key: string;
    signing_key: string;
    balance: number;
    tokens: number;
    is_active: boolean;
    is_private: boolean;
    created_by: string;
    created_at: Time;
}  

export { NucypherAccount, NucypherCharacter, DecryptionRequest, Grant, EncryptionRequest, NucypherUsername }