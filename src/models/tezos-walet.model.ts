import { Time } from '@angular/common';

class TezosWallet {
    balance: string;
    publicKey: string;
}

export class TezosAccount {
  id: number;
  name: string;
  organization_id: string;
  address: string;
  balance: any;
  tokens: string;
  is_active         :boolean
  is_private           :boolean
  created_by        :string
  created_at        :Time
  updated_by        :string
  updated_at        :Time
}

class TezosFaucetKey {
    mnemonic: [];
    secret: string;
    amount: string;
    pkh: string;
    password: string;
    email: string;
}

class TezosMemorySigner {
    email: string;
    password: string;
    mnemonic: string;
}

export class TezosNetwork {
    name: string;
    rpcUrl: string;
}
  
  export enum TezosNetworkType {
    MAINNET = 'mainnet',
    CARTHAGENET = 'carthagenet',
    CUSTOM = 'custom',
  }
  
  export namespace TezosNetwork {
    export function values(): string[] {
      return Object.values(TezosNetworkType).filter(
        (value) => typeof value === 'string'
      ) as string[];
    }
  
    export function getUrl(network: TezosNetworkType): string {
      return getNetwork(network).rpcUrl;
    }
  
    export function getNetwork(network: TezosNetworkType): TezosNetwork {
      return {
        [TezosNetworkType.MAINNET]: {
          type: TezosNetworkType.MAINNET,
          name: 'Mainnet',
          rpcUrl: 'https://api.tez.ie/rpc/mainnet',
        },
        [TezosNetworkType.CARTHAGENET]: {
          type: TezosNetworkType.CARTHAGENET,
          name: 'Carthagenet',
          rpcUrl: 'https://api.tez.ie/rpc/carthagenet',
        },
      }[network];
    }
  }

  export { TezosWallet, TezosFaucetKey, TezosMemorySigner }