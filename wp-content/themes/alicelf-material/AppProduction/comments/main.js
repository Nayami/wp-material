"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var comments_module_1 = require('./comments.module');
platform_browser_dynamic_1.platformBrowserDynamic()
    .bootstrapModule(comments_module_1.CommentsModule)
    .then(function (success) { return console.log("CommentsModule loaded"); });
//# sourceMappingURL=main.js.map