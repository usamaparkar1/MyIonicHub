import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { localHelpers } from './helpers/local-helpers';
import { TranslateModule } from '@ngx-translate/core';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({ defaultLanguage: localHelpers.defaultLanguage })
  ],
  providers: [{
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
  }],
  bootstrap: [AppComponent],
})

export class AppModule {}
