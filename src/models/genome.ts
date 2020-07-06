import { Time } from '@angular/common';

export class Genome {
    genome_id: number;
    genome_name: string;
    organization_id: number;
    organization_name: string;
    vaccine_id: string;
    vaccine_name: string;
    file_url: string;
    price: string;
    virus_name: string;
    simularity_rate: string;
    origin: string;
    owner_account: string;
    nucypher_account: string;
    filename: string;
    token_id: number;
    policy_id: number;
    receipt_id: number;
    ethereum_address: string;
    is_active         :boolean 
    is_sold           :boolean
    created_by        :string
    created_at        :Time
}