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
    localStorageMock = {};
    service['searchCounts'] = {};
    service['clickedBooks'] = {};
    service['searchStatsSubject'].next([]);
    service['clickedBooksSubject'].next([]);
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
    service.registerSearch('Angular');
  });


  it('should register multiple searches and sort them', (done) => {
    service.registerSearch('angular');
    service.registerSearch('rxjs');
    service.registerSearch('rxjs');

    service.searchStats$.subscribe((stats) => {
      if (stats.length === 2) {
        expect(stats[0].name).toBe('rxjs');
        expect(stats[0].value).toBe(2);
        expect(stats[1].name).toBe('angular');
        expect(stats[1].value).toBe(1);
        done();
      }
    });
  });
  it('should register book clicks and update stats', (done) => {
    service.clickedBooks$.subscribe((stats) => {
      if (stats.length) {
        expect(stats[0].name).toBe('clean code');
        expect(stats[0].value).toBe(1);
        done();
      }
    });
    service.registerBookClick('Clean Code');
  });

});
