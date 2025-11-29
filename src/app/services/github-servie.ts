import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';
import { Converter } from 'showdown';

export interface Project {
  name: string;
  description: string;
  html_url: string;
  full_name: string;
  alpha: boolean;
  abandoned: boolean;
  image?: Blob;
  readme?: string;
}

@Injectable({
  providedIn: 'root',
})
export class GitHubServie {
  private TOKEN = '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'; // No permissions in token except for public repos, so it is still secure
  private octokit = new Octokit({ auth: this.TOKEN });
  private repositories: Map<string, Project> = new Map();
  private lastUpdated: Date = new Date(0);


  async getRepositories(): Promise<Project[]> {
    const now = new Date();
    if (now.getTime() - this.lastUpdated.getTime() < 60000) {
      return [...this.repositories.values()];
    }

    console.log('Updating repositories...');

    let response = await this.octokit.request('GET /orgs/{org}/repos', {
      org: 'biq-cat'
    });
    this.lastUpdated = now;

    const repos = response.data.filter((repo) => repo.private === false);

    const formatted = await Promise.all(repos.map(async (repo: any) => await this.formatProjectFromJSON(repo)));
    this.repositories = new Map(formatted.map((repo: Project) => [repo.full_name, repo]));
    return formatted;
  }


  async loadImage(fullName: string): Promise<Blob | undefined> {
    const response = await fetch(`https://raw.githubusercontent.com/${fullName}/master/favicon.png`);
    if (!response.ok && response.status === 404) {
      return undefined;
    } else if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    return await response.blob();
  }

  async getReadme(fullName: string): Promise<string | undefined> {
    const response = await fetch(`https://raw.githubusercontent.com/${fullName}/master/README.md`);
    if (!response.ok && response.status === 404) {
      return undefined;
    } else if (!response.ok) {
      throw new Error(`Failed to fetch readme: ${response.statusText}`);
    }
    const md = await response.text();
    const conv = new Converter();
    conv.setFlavor('github');
    return conv.makeHtml(md);
  }

  async getProject(name: string): Promise<Project> {
    const now = new Date();
    if (now.getTime() - this.lastUpdated.getTime() < 60000) {
      const repo = this.repositories.get(name);
      if (repo) {
        return repo;
      }
    }
    const response = await this.octokit.request('GET /repos/{owner}/{repo}', {
      owner: 'biq-cat',
      repo: name
    })
    return await this.formatProjectFromJSON(response.data);
  }

  blobUrl(blob: Blob | undefined) {
    return blob ? URL.createObjectURL(blob) : "/github-mark/github-mark.png";
  }

  private async isAlpha(name: string): Promise<boolean> {
    const response = await this.octokit.request('GET /repos/{owner}/{repo}/releases', {
      owner: 'biq-cat',
      repo: name
    })

    const releases = response.data;
    const release = releases[0];
    return releases.length === 0 || release.tag_name === undefined || release.tag_name.startsWith('v0.');
  }

  private async formatProjectFromJSON(json: any): Promise<Project> {
    const image = await this.loadImage(json.full_name);
    const readme = await this.getReadme(json.full_name);
    return {
      name: json.name,
      description: json.description,
      html_url: json.html_url,
      full_name: json.full_name,
      alpha: await this.isAlpha(json.name),
      abandoned: json.archived || json.disabled || (new Date().getTime() - new Date(json.updated_at).getTime() > 365 / 2 * 24 * 60 * 60 * 1000),
      image,
      readme
    };
  }
}
