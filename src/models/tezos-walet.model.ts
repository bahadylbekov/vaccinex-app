class TezosWallet {
    balance: string;
    publicKey: string;
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

export interface TezosNetwork {
    type: TezosNetworkType;
    name?: string;
    rpcUrl?: string;
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