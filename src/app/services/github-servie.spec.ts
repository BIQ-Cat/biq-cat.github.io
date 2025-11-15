import { TestBed } from '@angular/core/testing';

import { GitHubServie } from './github-servie';

describe('GitHubServie', () => {
  let service: GitHubServie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitHubServie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
