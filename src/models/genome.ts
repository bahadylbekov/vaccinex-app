import { Time } from '@angular/common';

export class Genome {
    genome_id: number;
    name: string;
    organization_name: string;
    file_url: string;
    virus_name: string;
    simularity_rate: string;
    origin: string;
    status: string;
	is_active         :string
	is_sold           :string
	created_by        :string
	created_at        :Time
	updated_by        :string
	updated_at        :Time
}