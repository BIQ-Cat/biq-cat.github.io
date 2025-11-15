import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GitHubServie {
  async getRepositories(): Promise<string[]> {
    const response = await fetch('https://api.github.com/users/biq-cat/repos');
    const data = await response.json() as any[];
    return data.map((repo) => repo.name);
  }
}
