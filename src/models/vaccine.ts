import { Time } from '@angular/common'

export class Vaccine {
    vaccine_id: number;
	vaccine_name: string;
	virus_id: number;
	virus_name: string;
	description: string;
	requested_amount: string;
	funded_amount: string;
	is_active :boolean;
	created_by :string;
	created_at :Time;
}
