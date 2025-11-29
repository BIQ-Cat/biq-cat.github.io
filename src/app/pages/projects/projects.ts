import { Component, inject, signal } from '@angular/core';
import { GitHubServie, Project } from '../../services/github-servie';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly gitHubService = inject(GitHubServie);
  public readonly projects = signal<Project[]>([]);

  async ngOnInit() {
    this.projects.set(await this.gitHubService.getRepositories());
  }

}
