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
var layout_data_service_1 = require("../services/layout.data.service");
var GlobLoaderComponent = (function () {
    function GlobLoaderComponent(layoutData) {
        this.layoutData = layoutData;
        //let customAttr = el.nativeElement.getAttribute('customAttr');
        //console.log( customAttr );
    }
    GlobLoaderComponent.prototype.ngOnInit = function () {
    };
    GlobLoaderComponent = __decorate([
        core_1.Component({
            selector: 'GlobLoaderComponent',
            template: "\n\t\t<div *ngIf=\"!layoutData.layoutDataLoaded\" class=\"load-rising-holder\">\n\t\t\t<div class=\"load\">\n\t\t\t\t<div class=\"dot\"></div>\n\t\t\t\t<div class=\"outline\"><span></span></div>\n\t\t\t</div>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [layout_data_service_1.LayoutDataService])
    ], GlobLoaderComponent);
    return GlobLoaderComponent;
}());
exports.GlobLoaderComponent = GlobLoaderComponent;
//# sourceMappingURL=loaders.component.js.map