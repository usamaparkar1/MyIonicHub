import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from './guards/intro/intro.guard';
import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: 'screen-loader',
        loadChildren: () => import('./widgets/core/screen-loader/screen-loader.module').then( m => m.ScreenLoaderPageModule)
    },
    {
        path: 'introduction',
        loadChildren: () => import('./widgets/core/introduction/introduction.module').then( m => m.IntroductionPageModule),
        canActivate: [IntroGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./widgets/core/login/login.module').then( m => m.LoginPageModule),
        canActivate: [LoginGuard]
    },
    {
        path: 'signup',
        loadChildren: () => import('./widgets/core/signup/signup.module').then( m => m.SignupPageModule)
    },    
    {
        path: 'dashboard',
        loadChildren: () => import('./widgets/core/dashboard/dashboard.module').then( m => m.DashboardPageModule)
    },
    {
        path: 'cb-home',
        children: [
            {
                path: '',
                loadChildren: () => import('./widgets/projects/contract-booker/cb-home/cb-home.module').then( m => m.CbHomePageModule)
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
