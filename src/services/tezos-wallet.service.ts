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
import { contractJSON } from 'src/assets/smart-contract';

@Injectable({
  providedIn: 'root'
})

export class TezosWalletService {
  tezosNetwork = new TezosNetwork
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

  public async generateFaucetKey(key: any, strength = 256): Promise<string> {
    this.useTezosTestNet();
    const email = key.email;
    const password = key.password;
    const mnemonic = generateMnemonic(strength);
    const secret = key.secret;

    const signer = await InMemorySigner.fromFundraiser(email, password, mnemonic);
    this.tezos.setProvider({ rpc: this.tezosNetwork.rpcUrl, signer: signer });
    const publicKey = await this.tezos.signer.publicKey()
    ls.set('publicKey', publicKey)
    const publicKeyHash = await this.tezos.signer.publicKeyHash()
    ls.set('publicKeyHash', publicKeyHash)
    const secretKey = await this.tezos.signer.secretKey()
    ls.set('secretKey', secretKey)
    return mnemonic;
  }

  public async getContract(address: string) {
    Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet' });
    const contract = await this.tezos.contract.at(address);

    return {
      account: await this.tezos.rpc.getContract(address),
      storage: await contract.storage(),
      script: contract.script,
    };
  }

  public async getBalance (address: string): Promise<any> {
    Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet' });
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
    Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet', signer: await InMemorySigner.fromSecretKey('edskRvWaNTDNCnT1wQxfS3hsBfH1ShgbwVwEA7vLYv6xN1i284N5vtvJkj6NnrvmsxZ1i3AKRdAsLDbqxpGad4P1VST553oq2K') });
    Tezos.contract.transfer({ to: address_to, amount: amount })
    .then(op => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        const confirmations = op.confirmation(1).then(() => op.hash);
        return confirmations
    })
    .then(hash => console.log(`Operation injected: https://carthagenet.tzstats.com/${hash}`))
    .catch(error => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));
  }

  public async originateContract(): Promise<any> {
    Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet', signer: await InMemorySigner.fromSecretKey(ls.get('secretKey')) });
    try {
      const op = await Tezos.contract.originate({
        code: contractJSON,
        init: { "prim": "Pair", "args": [ { "string": ls.get('publicKeyHash') }, [] ] },
        fee: 100000,
        storageLimit: 20000,
        gasLimit: 500000,
      });
      console.log('Awaiting confirmation...');
      const contract = await op.contract();
      console.log('Storage', await contract.storage());
      console.log('Operation hash:', op.hash, 'Included in block level:', op.includedInBlock);
    } catch (ex) {
      console.error(ex);
    }  
  }

  public async buyTokenFromContract(tokenId: number, price: number) {
    Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet', signer: await InMemorySigner.fromSecretKey(ls.get('secretKey')) });
    return Tezos.contract.at('KT1ErwjDBhhYnq6w5Qky9kVewvMye1HsP9z5')
      .then(contract => {
        return contract.methods.buy(tokenId, price).send();
      })
      .then(op => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        return op.confirmation(1).then(() => op.hash);
      })
      .then(hash => console.log(`Operation injected: https://carthagenet.tzstats.com/${hash}`))
      .catch(error => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
  }

  public async createTokenUsingContract(tokenId: number, price: number, tokenURI: string) {
    Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet', signer: await InMemorySigner.fromSecretKey(ls.get('secretKey')) });
    return Tezos.contract.at('KT1ErwjDBhhYnq6w5Qky9kVewvMye1HsP9z5')
      .then(contract => {
        return contract.methods.build(100, tokenId, true, ls.get('publicKeyHash'), price, tokenURI).send();
      })
      .then(op => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        return op.confirmation(1).then(() => op.hash);
      })
      .then(hash => console.log(`Operation injected: https://carthagenet.tzstats.com/${hash}`))
      .catch(error => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
  }

  public async sellTokenFromContract(tokenId: number, price: number) {
    Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet', signer: await InMemorySigner.fromSecretKey(ls.get('secretKey')) });
    return Tezos.contract.at('KT1ErwjDBhhYnq6w5Qky9kVewvMye1HsP9z5')
      .then(contract => {
        return contract.methods.sell(tokenId, price).send();
      })
      .then(op => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        return op.confirmation(1).then(() => op.hash);
      })
      .then(hash => console.log(`Operation injected: https://carthagenet.tzstats.com/${hash}`))
      .catch(error => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
  }
}
