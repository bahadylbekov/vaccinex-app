import { TestBed } from '@angular/core/testing';

import { TezosWalletService } from './tezos-wallet.service';

describe('TezosWalletService', () => {
  let service: TezosWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TezosWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
