import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { LoginSignup } from './components/login-signup/login-signup';

export const routes: Routes = [
    {path:'',component:Main},
    {path:'login',component:LoginSignup}
];


