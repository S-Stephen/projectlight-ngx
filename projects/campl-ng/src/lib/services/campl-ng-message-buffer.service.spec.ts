import { TestBed } from '@angular/core/testing';

import { CamplNgMessageBufferService } from './campl-ng-message-buffer.service';

describe('CamplNgMessageBufferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CamplNgMessageBufferService = TestBed.get(CamplNgMessageBufferService);
    expect(service).toBeTruthy();
  });
});
