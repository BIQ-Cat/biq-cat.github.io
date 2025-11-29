import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitHubServie, Project } from '../../services/github-servie';

@Component({
  selector: 'app-single-project',
  imports: [],
  templateUrl: './single-project.html',
  styleUrl: './single-project.scss',
})
export class SingleProject {
  private route = inject(ActivatedRoute);
  protected readonly gitHubService = inject(GitHubServie);
  public readonly project = signal<Project>({ name: '', description: '', html_url: '', full_name: '', alpha: false, abandoned: false, image: undefined, readme: undefined });

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      console.log(params);
      this.project.set(await this.gitHubService.getProject(params['name']));
    })
  }
}
