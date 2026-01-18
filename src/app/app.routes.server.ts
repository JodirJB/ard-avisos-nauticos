import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server
  },
  {
    path: 'home',
    renderMode: RenderMode.Server
  },
  {
    path: 'nautical-notices',
    renderMode: RenderMode.Server
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'report-notice',
    renderMode: RenderMode.Server
  },
  {
    path: 'administration',
    renderMode: RenderMode.Client
  }
];
