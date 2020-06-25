import { Time } from '@angular/common';

export class Genome {
    genome_id: number;
    genome_name: string;
    organization_name: string;
    file_url: string;
    price: number;
    virus_name: string;
    simularity_rate: string;
    origin: string;
    status: string;
	is_active         :boolean 
	is_sold           :boolean
	created_by        :string
	created_at        :Time
	updated_by        :string
	updated_at        :Time
}