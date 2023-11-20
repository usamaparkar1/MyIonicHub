import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from 'src/app/guards/dashboard/dashboard.guard';
import { IntroGuard } from 'src/app/guards/intro/intro.guard';
import { LoginGuard } from 'src/app/guards/login/login.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: 'screen-loader',
        loadChildren: () => import('./core/screen-loader/screen-loader.module').then( m => m.ScreenLoaderPageModule)
    },
    {
        path: 'introduction',
        loadChildren: () => import('./core/introduction/introduction.module').then( m => m.IntroductionPageModule),
        canActivate: [IntroGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./core/login/login.module').then( m => m.LoginPageModule),
        canActivate: [LoginGuard]
    },
    {
        path: 'signup',
        loadChildren: () => import('./core/signup/signup.module').then( m => m.SignupPageModule)
    },    
    {
        path: 'dashboard',
        loadChildren: () => import('./core/dashboard/dashboard.module').then( m => m.DashboardPageModule),
        canActivate: [DashboardGuard]
    },
    {
        path: 'cb-home',
        children: [
            {
                path: '',
                loadChildren: () => import('./projects/contract-booker/core/cb-home/cb-home.module').then( m => m.CbHomePageModule)
            },
            {
                path: 'cb-customer-address',
                loadChildren: () => import('./projects/contract-booker/core/cb-customer-address/cb-customer-address.module').then( m => m.CbCustomerAddressPageModule)
            },
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
