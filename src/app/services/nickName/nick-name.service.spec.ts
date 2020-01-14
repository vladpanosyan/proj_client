import { TestBed } from '@angular/core/testing';

import { NickNameService } from './nick-name.service';

describe('NickNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NickNameService = TestBed.get(NickNameService);
    expect(service).toBeTruthy();
  });
});
