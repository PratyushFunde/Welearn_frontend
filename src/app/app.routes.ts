import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { LoginSignup } from './components/login-signup/login-signup';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './authguard/auth-guard';

export const routes: Routes = [
    { path: '', component: Main },
    { path: 'login', component: LoginSignup },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        component: Dashboard
    }
];


