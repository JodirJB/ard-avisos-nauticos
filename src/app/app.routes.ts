import { Routes } from '@angular/router';;

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'nautical-notices',
        loadComponent: () => import('./nautical-notices/nautical-notices.component').then(m => m.NauticalNoticesComponent),
    },
    {
        path: 'details/:id',
        loadComponent: () => import('./details/details.component').then(m => m.DetailsComponent),
    }
];
