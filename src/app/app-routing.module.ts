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
        path: 'dashboard',
        loadChildren: () => import('./widgets/core/dashboard/dashboard.module').then( m => m.DashboardPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
