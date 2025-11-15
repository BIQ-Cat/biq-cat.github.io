import { Component, ElementRef, HostListener, signal, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GitHubServie } from '../../services/github-servie';

@Component({
  selector: 'app-index',
  imports: [RouterLink],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class Index {
  protected readonly h1X = signal(0);
  protected readonly h1Y = signal(0);
  protected readonly h2X = signal(0);
  protected readonly h2Y = signal(0);
  protected readonly bgMoveX = signal(0);
  protected readonly bgMoveY = signal(0);

  private gitHub = inject(GitHubServie);
  protected readonly repositoriesCount = signal(0);

  async ngOnInit() {
    this.repositoriesCount.set((await this.gitHub.getRepositories()).length);

    this.onScroll();
  }

  paralaxOnMouseMove(event: MouseEvent) {
    this.h1X.set((event.clientX / window.innerWidth) * 20);
    this.h1Y.set((event.clientY / window.innerHeight) * 20);
    this.h2X.set((event.clientX / window.innerWidth) * 15);
    this.h2Y.set((event.clientY / window.innerHeight) * 15);

    this.bgMoveX.set((event.clientX / window.innerWidth) * 10);
    this.bgMoveY.set((event.clientY / window.innerHeight) * 10);
  }

  @ViewChild('dow') dow?: ElementRef;
  @ViewChild('easyserver') easyserver?: ElementRef;
  @HostListener('window:scroll') onScroll() {
    if (this.dow) {
      const rect = this.dow.nativeElement.getBoundingClientRect();
      if (rect.top <= innerHeight && rect.bottom >= 0) {
        this.dow.nativeElement.classList.add('visible');
      } else {
        this.dow.nativeElement.classList.remove('visible');
      }
    }

    if (this.easyserver) {
      const rect = this.easyserver.nativeElement.getBoundingClientRect();
      if (rect.top <= innerHeight && rect.bottom >= 0) {
        this.easyserver.nativeElement.classList.add('visible');
      } else {
        this.easyserver.nativeElement.classList.remove('visible');
      }
    }
  }
}
