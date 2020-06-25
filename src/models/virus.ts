import { Time } from '@angular/common'

export class Virus {
    virus_id      :number 
	virus_name         :string
	description  :string
	photo_url     :string
	family       :string
	fatality_rate :string
	spread       :string
	is_active     :boolean
	is_vaccine    :boolean
	created_by    :string
	created_at    :Time
	updated_by    :string
	updated_at    :Time

}