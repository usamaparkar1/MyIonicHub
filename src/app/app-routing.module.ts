import { McRemindersResolverService } from './projects/miscellaneous/services/resolvers/mc-reminders-resolver/mc-reminders-resolver.service';
import { ContractResolverService } from './projects/contract-booker/resolvers/contract-resolver/contract-resolver.service';
import { CbHomeResolverService } from './projects/contract-booker/resolvers/cb-home-resolver/cb-home-resolver.service';
import { PreloadAllModules, Route, RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from 'src/app/guards/dashboard/dashboard.guard';
import { IntroGuard } from 'src/app/guards/intro/intro.guard';
import { LoginGuard } from 'src/app/guards/login/login.guard';
import { NgModule } from '@angular/core';

const contractBookerRoutes: Route = {
    path: 'cb',
    children: [
        {
            path: 'cb-home',
            loadChildren: () => import('src/app/projects/contract-booker/pages/cb-home/cb-home.module').then( m => m.CbHomePageModule),
            resolve: {
                contracts: CbHomeResolverService
            }
        },
        {
            path: 'cb-customer-address',
            loadChildren: () => import('src/app/projects/contract-booker/pages/cb-customer-address/cb-customer-address.module').then( m => m.CbCustomerAddressPageModule),
        },
        {
            path: 'cb-product-selection',
            loadChildren: () => import('src/app/projects/contract-booker/pages/cb-product-selection/cb-product-selection.module').then( m => m.CbProductSelectionPageModule),
            resolve: {
                contract: ContractResolverService
            }
        },
        {
            path: 'cb-standard-consultation',
            loadChildren: () => import('./projects/contract-booker/pages/cb-standard-consultation/cb-standard-consultation.module').then( m => m.CbStandardConsultationPageModule),
            resolve: {
                contract: ContractResolverService
            }
        },
        {
            path: 'cb-price-comparison',
            loadChildren: () => import('./projects/contract-booker/pages/cb-price-comparison/cb-price-comparison.module').then( m => m.CbPriceComparisonPageModule),
            resolve: {
                contract: ContractResolverService
            }
        },
        {
            path: 'cb-product-details',
            loadChildren: () => import('./projects/contract-booker/pages/cb-product-details/cb-product-details.module').then( m => m.CbProductDetailsPageModule),
            resolve: {
                contract: ContractResolverService
            }
        }
    ]
}

const miscellaneousRoutes: Route = {
    path: 'mc',
    children: [
        {
            path: 'mc-home',
            loadChildren: () => import('./projects/miscellaneous/pages/mc-home/mc-home.module').then( m => m.McHomePageModule)
        },
        {
            path: 'mc-reminder',
            loadChildren: () => import('./projects/miscellaneous/pages/mc-reminder/mc-reminder.module').then( m => m.McReminderPageModule),
            resolve: {
                reminders: McRemindersResolverService
            }
        },
    ]
}

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
    contractBookerRoutes,
    miscellaneousRoutes,
    {
        path: 'route-not-found',
        loadChildren: () => import('./core/route-not-found/route-not-found.module').then( m => m.RouteNotFoundPageModule)
    },
    {
        path: '**',
        redirectTo: '/route-not-found'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
