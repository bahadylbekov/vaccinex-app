import { Time } from '@angular/common'

export class Policy {
    policy_id :number
    alice_sig_pubkey :number
    label           :string
    policy_pubkey       :string
    created_by        :string
	created_at        :Time
}