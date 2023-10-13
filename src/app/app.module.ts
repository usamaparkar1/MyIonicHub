import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { localHelpers } from './helpers/local-helpers';
import { TranslateModule } from '@ngx-translate/core';
import { RouteReuseStrategy } from '@angular/router';
import { AppService } from './services/app.service';
import { AppComponent } from './app.component';

export function initializeFactory(init: AppService) {
    return () => init.initializeApp();
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot({ defaultLanguage: localHelpers.defaultLanguage })
    ],
    providers: [
        AppService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: APP_INITIALIZER, useFactory: initializeFactory, deps: [AppService], multi: true }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule {}
