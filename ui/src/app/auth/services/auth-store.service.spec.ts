import { TestBed } from '@angular/core/testing';

import { AuthStoreService } from './auth-store.service';

describe('AuthStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthStoreService = TestBed.get(AuthStoreService);
    expect(service).toBeTruthy();
  });
});
