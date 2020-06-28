import { Time } from '@angular/common';

export class EthereumAccount {
    account_id: number;
    name: string;
    organization_id: string;
    address: string;
    balance: any;
    tokens: string;
    is_active: boolean;
    is_private: boolean;
    created_by: string;
    created_at: Time;
}  
