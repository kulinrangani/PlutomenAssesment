import { TestBed } from '@angular/core/testing';

import { LibraryserviceService } from './libraryservice.service';

describe('LibraryserviceService', () => {
  let service: LibraryserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
