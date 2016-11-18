// import "core-js";
// import "reflect-metadata";
// import "zone.js/dist/zone.js";
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_module_1 = require('./app.module');
// import {enableProdMode} from '@angular/core';
// enableProdMode();
platform_browser_dynamic_1.platformBrowserDynamic()
    .bootstrapModule(app_module_1.AppModule)
    .then(function (success) { return console.log('A2 loaded'); });
//# sourceMappingURL=main.js.map