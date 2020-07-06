import { Time } from '@angular/common'

export class Receipt {
    receipt_id :number
    data_source_public_key :number
    hash_key           :string
    created_by        :string
	created_at        :Time
}