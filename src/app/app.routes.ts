import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { LoginSignup } from './components/login-signup/login-signup';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './authguard/auth-guard';
import { Hero } from './components/hero/hero';
import { Practice } from './components/practice/practice';
import { CodingChallenges } from './components/coding-challenges/coding-challenges';
import { Analytics } from './components/analytics/analytics';
import { InterviewGuide } from './components/interview-guide/interview-guide';
import { Skills } from './components/skills/skills';
import { InterviewScreen } from './components/interview-screen/interview-screen';
import { Comingsoon } from './components/comingsoon/comingsoon';

export const routes: Routes = [
    { path: '', component: Main },
    { path: 'login', component: LoginSignup },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        component: Dashboard,
        children: [
            {
                path: '',
                component: Hero,
                children: [
                    { path: 'practice', component: Practice },
                    { path: 'challenge', component: Comingsoon },
                    { path: 'analytics', component: Comingsoon },
                    { path: 'guide', component: Comingsoon },
                    { path: 'skills', component: Comingsoon },
                    {path:"interview",component:InterviewScreen},
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
                ]
            }
        ]
    },
    { path: 'interview', component: InterviewScreen }
];


