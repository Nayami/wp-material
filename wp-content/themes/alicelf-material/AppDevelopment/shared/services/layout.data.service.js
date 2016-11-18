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
var LayoutDataService = (function () {
    function LayoutDataService() {
        this.layoutDataLoaded = false;
        this.startLoading();
    }
    LayoutDataService.prototype.invokeLoad = function () {
        var _this = this;
        var elemJ = document.getElementsByClassName('load-rising-holder'), loader = elemJ[0];
        if (loader) {
            var opacity_1 = 1;
            var inter_1 = setInterval(function () {
                if (loader !== undefined) {
                    loader['style'].opacity = opacity_1;
                }
                opacity_1 -= 0.05;
                if (opacity_1 <= 0) {
                    clearInterval(inter_1);
                    _this.layoutDataLoaded = true;
                }
            }, 50);
        }
        else {
            this.layoutDataLoaded = true;
        }
    };
    LayoutDataService.prototype.startLoading = function () {
        this.layoutDataLoaded = false;
    };
    LayoutDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LayoutDataService);
    return LayoutDataService;
}());
exports.LayoutDataService = LayoutDataService;
//# sourceMappingURL=layout.data.service.js.map