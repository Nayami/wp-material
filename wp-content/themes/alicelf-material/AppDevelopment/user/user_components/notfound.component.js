"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var layout_data_service_1 = require("../../shared/services/layout.data.service");
var NotFoundComponent = (function () {
    function NotFoundComponent(layoutData) {
        this.layoutData = layoutData;
    }
    NotFoundComponent.prototype.ngOnInit = function () {
        this.layoutData.invokeLoad();
    };
    NotFoundComponent = __decorate([
        core_1.Component({
            template: "\n\t\t<div class=\"am-wrap\">\n\t\t\t<br>\n\t\t\t<h1 class=\"text-center\">.404 not found.</h1>\n\t\t\t<div class=\"mdl-grid\">\n\t\t\t\t<div class=\"mdl-cell mdl-cell--12-col\">\n\t\t\t\t\tNothing found\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [layout_data_service_1.LayoutDataService])
    ], NotFoundComponent);
    return NotFoundComponent;
}());
exports.NotFoundComponent = NotFoundComponent;
//# sourceMappingURL=notfound.component.js.map