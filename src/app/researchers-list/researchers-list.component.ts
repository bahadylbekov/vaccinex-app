import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { RequestedGrant, NucypherAccount, Grant, Policy, Receipt, DecryptionRequest } from 'src/models';
const Web3 = require('web3');
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../assets/contract.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-researchers-list',
  templateUrl: './researchers-list.component.html',
  styleUrls: ['./researchers-list.component.scss']
})


export class ResearchersListComponent implements OnInit {

  constructor(public api: ApiService, private http: HttpClient) { }
  nucypher_account = new NucypherAccount
  alice_account: string;
  grant_request = new Grant;
  nucypher_password: string = '';
  decrypting_nucypher_password: string = '';
  ethereum_account: string;
  is_password_opened = false;
  grant_locked = false;
  decrypt_locked = false;
  submition_request = new SubmitionRequest;
  decrypting_request = new DecryptionRequest
  web3 = new Web3(Web3.givenProvider)
  contract = new this.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

  requiredGrants: RequestedGrant[] = []
  completedGrants: RequestedGrant[] = []
  async ngOnInit() {
    await this.loadNucypherAccount();
    await this.isInstalled()
    await this.isLocked()
    await this.getAccounts()
  }

  isInstalled() {
    if (typeof this.web3 !== 'undefined'){
       console.log('MetaMask is installed')
    } 
    else{
       console.log('MetaMask is not installed')
    }
  }  

  isLocked() {
    this.web3.eth.getAccounts(function(err, accounts){
       if (err != null) {
          console.log(err)
       }
       else if (accounts.length === 0) {
          window['ethereum'].enable()
          console.log('MetaMask is locked')
       }
       else {
          console.log('MetaMask is unlocked')
       }
    });
  }

  async getAccounts(): Promise<any> {
    await this.web3.eth.getAccounts(async (err, accs) => {   
      if (err != null || accs.length === 0) {
        return
      }
      this.ethereum_account = accs[0]
      return this.ethereum_account
    });
  }


  async loadRequiredGrants(address: string) {
    await this.api.getRequestedGrants$(address).subscribe(async (res) => {
      if (res != null) {
        await console.log(res)
        this.requiredGrants = await res
      }
    })
  }

  async loadCompletedGrants() {
    await this.api.getCompletedGrants$().subscribe(async (res) => {
      if (res != null) {
        await console.log(res)
        this.completedGrants = await res
      }
    })
  }

  openPassword() {
    this.is_password_opened = true
  }

  async grantAccess(grant: RequestedGrant) {
    this.grant_request.username = await grant.alice_nucypher_account_name
    this.grant_request.label = await grant.label
    this.grant_request.account = await grant.alice_nucypher_account_address
    this.grant_request.bob_username = await grant.bob_nucypher_account_name
    this.grant_request.password = await this.nucypher_password
    console.log(this.grant_request)
    this.grant_locked = await true;
    await this.api.grantAccess$(this.grant_request).subscribe(async res => {
      console.log(res)
    }, err => console.log(err));
    await this.approveTransfer(grant.bob_ethereum_account, grant.token_id)
    this.submition_request.hash_key = await grant.hash_key
    console.log(this.submition_request)
    await this.submitGrant(this.submition_request)
    this.grant_locked = await false;
  }

  async approveTransfer(address_to: string, token_id: number) {
    await this.contract.methods.approve(address_to, token_id).send({from: this.ethereum_account })
    .then(result => {
        console.log(result)
    })
    .catch(error => console.log(error))
  }

  async submitGrant(data: SubmitionRequest) {
    await this.api.submitRequestedGrant$(data).subscribe(async res => {
      console.log(res)
    }, err => console.log(err));
  }

  async loadNucypherAccount() {
    await this.api.getMyNucypherAccounts$().subscribe(async (res) => {
      if (res != null && res[0] != null) {
        await console.log(res)
        this.nucypher_account = await res[0]
        await this.loadRequiredGrants(this.nucypher_account.address)
        await this.loadCompletedGrants()
      }
    })
  }

  async decryptData(grant: RequestedGrant) {
    this.decrypt_locked = await true
    await this.getPolicy(grant.policy_id) 
    await this.getReceipt(grant.receipt_id)
    await this.safeTransfer(grant.alice_ethereum_account, this.ethereum_account, grant.token_id)
    await this.downloadAndDecrypt(this.decrypting_request)
    this.decrypt_locked = await false
  }

  isObject(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
  }

  async downloadAndDecrypt(data: DecryptionRequest) {
    data.username = await this.nucypher_account.name;
    let label = await this.decrypting_request.policy_info.label
    let parsed_label = await label.split('.')
    let format = parsed_label[parsed_label.length - 1]
    fetch('http://localhost:5000/decrypt', {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
    .then(response => response.blob())
    .then(response => {
        const blob = new Blob([response], {type: response.type});
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = "file."+format;
        document.body.appendChild(a);
        a.click();
    })
  }

  async safeTransfer(address_from: string, address_to: string, token_id: number) {
    await this.contract.methods.safeTransferFrom(address_from, address_to, token_id).send({from: this.ethereum_account })
    .then(result => {
        console.log(result)
    })
    .catch(error => console.log(error))
  }

  async getPolicy(id: number) {
    await this.api.getPolicyByID$(id).subscribe(async (res) => {
      if (res != null) {
        await console.log(res)
        this.decrypting_request.policy_info = await res
      }
    })
  }

  downloadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL || window.webkitURL;
    let blob_uri = url.createObjectURL(blob)
    let pwa = window.open(blob_uri);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
  }

  async getReceipt(id: number) {
    await this.api.getReceiptByID$(id).subscribe(async (res) => {
      if (res != null) {
        await console.log(res)
        this.decrypting_request.receipt = await res
      }
    })
  }

}

class SubmitionRequest {
  hash_key: string;
}
