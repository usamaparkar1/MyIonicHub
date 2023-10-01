import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { localHelpers } from './helpers/local-helpers';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    TranslateModule.forRoot({ defaultLanguage: localHelpers.defaultLanguage })
  ],
  providers: [{
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
