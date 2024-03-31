import { ActionSheetService } from 'src/app/services/action-sheet/action-sheet.service';
import coreDataJson from 'src/assets/json-data/core-data.json';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';

@Component({
    selector: 'app-route-not-found',
    templateUrl: './route-not-found.page.html',
    styleUrls: ['./route-not-found.page.scss'],
})

export class RouteNotFoundPage implements OnInit {

    coreData = coreDataJson;
    cards: RouteNotFoundCards[] = [
        {
            icon: 'home',
            title: RouteNotFoundLinks.dashboard,
            description: this._translateService.instant('ROUTE_NOT_FOUND.DASHBOARD_DESCRIPTION'),
        },
        {
            icon: 'log-in',
            title: RouteNotFoundLinks.login,
            description: this._translateService.instant('ROUTE_NOT_FOUND.LOGIN_DESCRIPTION'),
        },
        {
            icon: 'exit',
            title: RouteNotFoundLinks.exit,
            description: this._translateService.instant('ROUTE_NOT_FOUND.EXIT_DESCRIPTION'),
        }
    ];

    constructor(
        private _translateService: TranslateService,
        private _actionSheetService: ActionSheetService
    ) { }

    ngOnInit() {}

    changeRoute(route: string) {
        switch (route) {
            case RouteNotFoundLinks.dashboard:
                this._handleDashboardRoute();
                break;
            case RouteNotFoundLinks.login:
                this._handleLoginRoute();
                break;
            case RouteNotFoundLinks.exit:
                this._handleExitRoute();
                break;
            default:
                this._handleLoginRoute();
                break;
        }
    }

    private _handleDashboardRoute(): void {
        this._actionSheetService.onAppLogoutFromProfileSheet();
    }

    private _handleLoginRoute(): void {
        this._actionSheetService.onAccountLogoutFromProfileSheet();
    }

    private _handleExitRoute(): void {
        App.exitApp();
    }
}

interface RouteNotFoundCards {
    icon: string;
    title: string;
    description: string;
}

export const RouteNotFoundLinks = {
    dashboard: 'dashboard',
    login: 'login',
    exit: 'exit'
}