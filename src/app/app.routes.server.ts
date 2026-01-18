import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server
  },
  {
    path: 'client',
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
    path: 'login',
    renderMode: RenderMode.Server
  },
  {
    path: 'administration',
    renderMode: RenderMode.Server
  },
  {
    path: 'administrative-nautical-notices',
    renderMode: RenderMode.Server
  },
  {
    path: 'administrative-report',
    renderMode: RenderMode.Server
  }
];
