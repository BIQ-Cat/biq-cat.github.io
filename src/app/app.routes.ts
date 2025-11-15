import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Index } from './pages/index';
import { DowMapViewerWeb } from './pages/dow-map-viewer-web/dow-map-viewer-web';
import { EasyServer } from './pages/easy-server/easy-server';
import { Projects } from './pages/projects/projects';
import { SingleProject } from './pages/single-project/single-project';

export const routes: Routes = [
  {
    path: '',
    component: Index
  },
  {
    path: 'about',
    component: About
  },
  {
    path: 'dow-map-viewer',
    component: DowMapViewerWeb
  },
  {
    path: 'easyserver',
    component: EasyServer
  },
  {
    path: 'projects/:id',
    component: SingleProject
  },
  {
    path: 'projects',
    component: Projects
  },
];
