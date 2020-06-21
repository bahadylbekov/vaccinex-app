import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tezos, TezosToolkit } from '@taquito/taquito';
import { TezosWalletUtil, KeyStore } from 'conseiljs';
import { InMemorySigner } from '@taquito/signer';
import { generateMnemonic } from 'bip39';
import { tezosSample } from './tezoscontract';
import * as ls from "local-storage";

import { TezosWallet, TezosFaucetKey, TezosMemorySigner, TezosNetwork } from '../models'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TezosWalletService {
  tezosNetwork: TezosNetwork
  tezos = new TezosToolkit();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  public async useTezosTestNet(): Promise<TezosNetwork> {
    this.tezosNetwork.name = 'Carthagenet'
    this.tezosNetwork.rpcUrl = 'https://api.tez.ie/rpc/carthagenet'
    return this.tezosNetwork
  }

  public async useTezosMainNet(): Promise<TezosNetwork> {
    this.tezosNetwork.name = 'Main Net'
    this.tezosNetwork.rpcUrl = 'https://api.tez.ie/rpc/mainnet'
    return this.tezosNetwork
  }

  public async generateFaucetKey(key: any, strength = 256) {
    const email = key.email;
    const password = key.password;
    const mnemonic = generateMnemonic(strength);
    const secret = key.secret;

    const signer = await InMemorySigner.fromFundraiser(email, password, mnemonic);
    this.tezos.setProvider({ rpc: this.tezosNetwork.rpcUrl, signer: signer });
  }

  public async generateAccount(mnemonic: string): Promise<KeyStore> {
    const keystore = await TezosWalletUtil.unlockIdentityWithMnemonic(mnemonic, '');
    console.log(`account id: ${keystore.publicKeyHash}`);
    ls.set('publicKeyHash', keystore.publicKeyHash)
    console.log(`public key: ${keystore.publicKey}`);
    ls.set('publicKey', keystore.publicKey)
    console.log(`secret key: ${keystore.privateKey}`);
    ls.set('privateKey', keystore.privateKey)
    return keystore
  }

  public async getContract(address: string) {
    const contract = await this.tezos.contract.at(address);

    return {
      account: await this.tezos.rpc.getContract(address),
      storage: await contract.storage(),
      script: contract.script,
    };
  }

  public async getBalance (address: string): Promise<any> {
    Tezos.tz
      .getBalance(address)
      .then(balance => {
        return balance.toNumber() / 1000000
      })
      .catch(error => {
        console.log(JSON.stringify(error))
        return
      });
  }

  public async sendTransfer (address_to: string, amount: number): Promise<any> {
    Tezos.contract.transfer({ to: address_to, amount: amount })
    .then(op => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        const confirmations = op.confirmation(1).then(() => op.hash);
        return confirmations
    })
    .then(hash => console.log(`Operation injected: https://carthagenet.tzstats.com/${hash}`))
    .catch(error => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));
  }

  public async originateContract(param: any): Promise<any> {
    try {
      console.log('Deploying Ligo simple contract...');
      const op = await Tezos.contract.originate({
        balance: '1',
        code: tezosSample,
        init: { int: param },
        fee: 30000,
        storageLimit: 2000,
        gasLimit: 90000,
      });
      console.log('Awaiting confirmation...');
      const contract = await op.contract();
      console.log('Storage', await contract.storage());
      console.log('Operation hash:', op.hash, 'Included in block level:', op.includedInBlock);
    } catch (ex) {
      console.error(ex);
    }  
  }

  public async callContract(method: string, contract: string, amount: number) {
    return Tezos.contract.at('KT1JVErLYTgtY8uGGZ4mso2npTSxqVLDRVbC')
      .then(contract => {
        const i = 7;

        console.log(`Incrementing storage value by ${i}...`);
        return contract.methods.increment(i).send();
      })
      .then(op => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        return op.confirmation(1).then(() => op.hash);
      })
      .then(hash => console.log(`Operation injected: https://carthagenet.tzstats.com/${hash}`))
      .catch(error => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
  }
}
