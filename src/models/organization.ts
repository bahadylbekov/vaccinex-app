import { Time } from '@angular/common'

export class Organization {
    organization_id :number
    organization_name           :string
    photo_url       :string
    email          :string
    website        :string
    country        :string
    city           :string
    description     :string
    specialization :string
    deals          :string
    genomes_amount  :string
    funded_amount   :string
    is_active       :boolean
    created_by        :string
	created_at        :Time
	updated_by        :string
	updated_at        :Time
}
  