// import "core-js";
// import "reflect-metadata";
// import "zone.js/dist/zone.js";

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

// import {enableProdMode} from '@angular/core';
// enableProdMode();


platformBrowserDynamic()
	.bootstrapModule( AppModule )
	.then( success => console.log( 'A2 loaded' ) );