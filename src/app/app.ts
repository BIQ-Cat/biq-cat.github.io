import { Component, signal, computed } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Switch } from './components/switch/switch';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Switch],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('biq-cat-website');
  protected readonly isDark = signal(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  protected readonly themeName = computed(() => this.isDark() ? 'dark' : 'light');

  constructor() {
    document.documentElement.setAttribute('data-theme', this.themeName());
  }

  toggleTheme(state: boolean) {
    this.isDark.set(state);

    document.documentElement.setAttribute('data-theme', this.themeName());
  }
}
