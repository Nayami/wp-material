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
require('rxjs/Rx');
var cart_service_1 = require("../shared/services/woocommerce/cart.service");
var WooComponent = (function () {
    function WooComponent(cartService) {
        this.cartService = cartService;
    }
    WooComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productsSubscription =
            this.cartService.GetProducts()
                .subscribe(function (data) {
                if (data.length > 0) {
                    _this.cartService.products = data;
                    _this.cartService.cartEmpty = false;
                }
            });
    };
    WooComponent.prototype.ngOnDestroy = function () {
        if (this.productsSubscription !== undefined) {
            this.productsSubscription.unsubscribe();
        }
    };
    WooComponent = __decorate([
        core_1.Component({
            selector: 'AMinicartRoot',
            template: ""
        }), 
        __metadata('design:paramtypes', [cart_service_1.CartService])
    ], WooComponent);
    return WooComponent;
}());
exports.WooComponent = WooComponent;
//# sourceMappingURL=minicart.component.js.map