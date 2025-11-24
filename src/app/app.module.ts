import { cartReducer } from './projects/contract-booker/store/reducers/cart.reducer';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MenusComponent } from './core/menus/menus.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BrowserModule } from '@angular/platform-browser';
import { AppService } from './services/app/app.service';
import { AppRoutingModule } from './app-routing.module';
import { localHelpers } from './helpers/local-helpers';
import { TranslateModule } from '@ngx-translate/core';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';

export function initializeFactory(init: AppService) {
    return () => init.initializeApp();
}

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [BrowserModule,
        MenusComponent,
        AppRoutingModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        StoreModule.forRoot({ cartCount: cartReducer }),
        TranslateModule.forRoot({ defaultLanguage: localHelpers.defaultLanguage })], providers: [
        AppService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: APP_INITIALIZER, useFactory: initializeFactory, deps: [AppService], multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })

export class AppModule {}
