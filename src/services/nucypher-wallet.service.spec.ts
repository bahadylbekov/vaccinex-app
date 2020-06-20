import { TestBed } from '@angular/core/testing';

import { NucypherWalletService } from './nucypher-wallet.service';

describe('NucypherWalletService', () => {
  let service: NucypherWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NucypherWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
