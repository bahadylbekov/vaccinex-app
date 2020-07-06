import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../assets/contract.js';
import Web3 from 'web3';
import { EthereumAccount } from 'src/models/index.js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  ethereum_account: string;
  account: string;
  accounts: any;
  balance: any;

  constructor(
    private http: HttpClient,
  ) { }

}
