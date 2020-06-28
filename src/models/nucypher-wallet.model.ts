import { Time } from '@angular/common';

class NuCypherAlice {
    aliceVerKey: string;
    aliceSigKey: string;
}

class NuCypherEnrico {
    message_kit: string;
    signature: string;
}

class NuCypherBob {
    bobVerKey: string;
    bobEncKey: string;
}

class NucypherAccount {
    account_id: number;
    name: string;
    organization_id: string;
    address: string;
    verifying_key: string;
    balance: any;
    tokens: string;
    is_active: boolean;
    is_private: boolean;
    created_by: string;
    created_at: Time;
}  

export { NuCypherAlice, NuCypherEnrico, NuCypherBob, NucypherAccount }