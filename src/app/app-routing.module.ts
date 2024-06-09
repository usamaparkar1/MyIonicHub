import { CbNewAppointmentResolverService } from './projects/contract-booker/resolvers/cb-new-appointment-resolver/cb-new-appointment-resolver.service';
import { CbAppointmentsResolverService } from './projects/contract-booker/resolvers/cb-appointments-resolver/cb-appointments-resolver.service';
import { McRemindersResolverService } from './projects/miscellaneous/services/resolvers/mc-reminders-resolver/mc-reminders-resolver.service';
import { CbMyContractsResolverService } from './projects/contract-booker/resolvers/cb-my-contracts/cb-my-contracts-resolver.service';
import { CbContractResolverService } from './projects/contract-booker/resolvers/cb-contract-resolver/cb-contract-resolver.service';
import { CbCustomerAddressGuard } from './projects/contract-booker/guards/cb-customer-address/cb-customer-address.guard';
import { CbCartResolverService } from './projects/contract-booker/resolvers/cb-cart-resolver/cb-cart-resolver.service';
import { CbHomeResolverService } from './projects/contract-booker/resolvers/cb-home-resolver/cb-home-resolver.service';
import { CbNewsResolverService } from './projects/contract-booker/resolvers/cb-news-resolver/cb-news-resolver.service';
import { CbAuthenticationGuard } from './projects/contract-booker/guards/cb-authentication/cb-authentication.guard';
import { McAuthenticationGuard } from './projects/miscellaneous/guards/mc-authentication/mc-authentication.guard';
import { CbShoppingCartGuard } from './projects/contract-booker/guards/cb-shopping-cart/cb-shopping-cart.guard';
import { PreloadAllModules, Route, RouterModule, Routes, mapToCanActivateChild } from '@angular/router';
import { CbContractGuard } from './projects/contract-booker/guards/cb-contract/cb-contract.guard';
import { CbSupportGuard } from './projects/contract-booker/guards/cb-support/cb-support.guard';
import { DashboardResolverService } from './resolvers/dashboard/dashboard-resolver.service';
import { DashboardGuard } from 'src/app/guards/dashboard/dashboard.guard';
import { IntroGuard } from 'src/app/guards/intro/intro.guard';
import { LoginGuard } from 'src/app/guards/login/login.guard';
import { NgModule } from '@angular/core';

const contractBookerRoutes: Route = {
    path: 'cb',
    canActivateChild: mapToCanActivateChild([CbAuthenticationGuard]),
    children: [
        {
            path: 'cb-home',
            loadChildren: () => import('src/app/projects/contract-booker/pages/cb-home/cb-home.module').then( m => m.CbHomePageModule),
            resolve: {
                homePageLinks: CbHomeResolverService,
                myContracts: CbMyContractsResolverService
            }
        },
        {
            path: 'cb-customer-address',
            loadChildren: () => import('src/app/projects/contract-booker/pages/cb-customer-address/cb-customer-address.module').then( m => m.CbCustomerAddressPageModule),
            canActivate: [CbCustomerAddressGuard]
        },
        {
            path: 'cb-product-selection/:id',
            loadChildren: () => import('src/app/projects/contract-booker/pages/cb-product-selection/cb-product-selection.module').then( m => m.CbProductSelectionPageModule),
            resolve: {
                contract: CbContractResolverService
            },
            canActivate: [CbContractGuard]
        },
        {
            path: 'cb-standard-consultation/:id',
            loadChildren: () => import('./projects/contract-booker/pages/cb-standard-consultation/cb-standard-consultation.module').then( m => m.CbStandardConsultationPageModule),
            resolve: {
                contract: CbContractResolverService
            },
            canActivate: [CbContractGuard]
        },
        {
            path: 'cb-price-comparison/:id',
            loadChildren: () => import('./projects/contract-booker/pages/cb-price-comparison/cb-price-comparison.module').then( m => m.CbPriceComparisonPageModule),
            resolve: {
                contract: CbContractResolverService
            },
            canActivate: [CbContractGuard]
        },
        {
            path: 'cb-product-details/:id',
            loadChildren: () => import('./projects/contract-booker/pages/cb-product-details/cb-product-details.module').then( m => m.CbProductDetailsPageModule),
            resolve: {
                contract: CbContractResolverService
            },
            canActivate: [CbContractGuard]
        },
        {
            path: 'cb-shopping-cart',
            loadChildren: () => import('./projects/contract-booker/pages/cb-shopping-cart/cb-shopping-cart.module').then( m => m.CbShoppingCartPageModule),
            resolve: {
                contracts: CbCartResolverService
            },
            canActivate: [CbShoppingCartGuard]
        },
        {
            path: 'cb-add-contract',
            loadChildren: () => import('./projects/contract-booker/pages/cb-add-contract/cb-add-contract.module').then( m => m.CbAddContractPageModule),
            resolve: {
                contracts: CbCartResolverService
            },
            canActivate: [CbShoppingCartGuard]
        },
        {
            path: 'cb-sign-contract/:id',
            loadChildren: () => import('./projects/contract-booker/pages/cb-sign-contract/cb-sign-contract.module').then( m => m.CbSignContractPageModule),
            resolve: {
                contract: CbContractResolverService
            },
            canActivate: [CbContractGuard]
        },
        {
            path: 'cb-my-contracts',
            loadChildren: () => import('./projects/contract-booker/pages/cb-my-contracts/cb-my-contracts.module').then( m => m.CbMyContractsPageModule)
        },
        {
            path: 'cb-news',
            loadChildren: () => import('./projects/contract-booker/pages/cb-news/cb-news.module').then( m => m.CbNewsPageModule),
            resolve: {
                news: CbNewsResolverService
            }
        },
        {
            path: 'cb-appointments',
            loadChildren: () => import('./projects/contract-booker/pages/cb-appointments/cb-appointments.module').then( m => m.CbAppointmentsPageModule),
            resolve: {
                appointments: CbAppointmentsResolverService
            }
        },
        {
            path: 'cb-new-appointment',
            loadChildren: () => import('./projects/contract-booker/pages/cb-new-appointment/cb-new-appointment.module').then( m => m.CbNewAppointmentPageModule)
        },
        {
            path: 'cb-edit-appointment/:appointmentId',
            loadChildren: () => import('./projects/contract-booker/pages/cb-new-appointment/cb-new-appointment.module').then( m => m.CbNewAppointmentPageModule),
            resolve: {
                oldAppointment: CbNewAppointmentResolverService
            }
        },
        {
            path: 'cb-support',
            loadChildren: () => import('./projects/contract-booker/pages/cb-support/cb-support.module').then( m => m.CbSupportPageModule),
            canActivate: [CbSupportGuard]
        },
    ]
}

const miscellaneousRoutes: Route = {
    path: 'mc',
    canActivateChild: mapToCanActivateChild([McAuthenticationGuard]),
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
        resolve: {
            projects: DashboardResolverService
        },
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
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
