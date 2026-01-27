import { Routes } from '@angular/router';import { SecurityGuard } from './auth/guards/security.guard';
;

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./client/client.component').then(m => m.ClientComponent)
    },
    {
        path: 'client',
        loadComponent: () => import('./client/client.component').then(m => m.ClientComponent)
    },
    {
        path: 'nautical-notices',
        loadComponent: () => import('./client/nautical-notices/nautical-notices.component').then(m => m.NauticalNoticesComponent)
    },
    {
        path: 'details/:id',
        loadComponent: () => import('./details/details.component').then(m => m.DetailsComponent)
    },
    {
        path: 'report-notice',
        loadComponent: () => import('./client/report-notice/report-notice.component').then(m => m.ReportNoticeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'administrative-nautical-notices',
        loadComponent: () => import('./administration/administrative-nautical-notices/administrative-nautical-notices.component').then(m => m.AdministrativeNauticalNoticesComponent),
        // canActivate: [SecurityGuard],
        // data: { grantedRoles: ['manage_avisos_nauticos'] }
    },
    {
        path: 'administration',
        loadComponent: () => import('./administration/administration.component').then(m => m.AdministrationComponent),
        // canActivate: [SecurityGuard],
        // data: { grantedRoles: ['manage_avisos_nauticos'] }
    },
    {
        path: 'administrative-report',
        loadComponent: () => import('./administration/administrative-report/administrative-report.component').then(m => m.AdministrativeReportComponent),
        // canActivate: [SecurityGuard],
        // data: { grantedRoles: ['manage_avisos_nauticos'] }
    }
];
