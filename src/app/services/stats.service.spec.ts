import { TestBed } from '@angular/core/testing';

import { StatsService } from './stats.service';

describe('StatsService', () => {
  let service: StatsService;
  let localStorageMock: { [key: string]: string } = {};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsService);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      localStorageMock[key] = value;
    });

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return localStorageMock[key] || null;
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should register a search query and update stats', (done) => {
    service.searchStats$.subscribe((stats) => {
      if (stats.length) {
        expect(stats[0].name).toBe('angular');
        expect(stats[0].value).toBe(1);
        done();
      }
    });
    service.registerSearch('angular');
  });

});
