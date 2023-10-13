import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { Capacitor } from '@capacitor/core';


if (environment.production) {
    enableProdMode();
}

// --> Below only required if you want to use a web platform
const platform = Capacitor.getPlatform();
if (platform === "web") {
    // Web platform
    // required for jeep-sqlite Stencil component
    // to use a SQLite database in Browser
    jeepSqlite(window);

    window.addEventListener('DOMContentLoaded', async () => {
        const jeepEl = document.createElement("jeep-sqlite");
        document.body.appendChild(jeepEl);
    });
}
// Above only required if you want to use a web platform <--

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(error => console.error(error));
