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
var user_global_service_1 = require('./services/user.global.service');
exports.UserGlobalService = user_global_service_1.UserGlobalService;
var flash_notices_1 = require("./services/alert.dialog.modal/flash.notices");
exports.FlashNoticeService = flash_notices_1.FlashNoticeService;
var auth_service_1 = require("./services/auth.service");
exports.AuthGlobalService = auth_service_1.AuthGlobalService;
var app_settings_service_1 = require("./services/app.settings.service");
exports.AppSettingsService = app_settings_service_1.AppSettingsService;
var layout_data_service_1 = require("./services/layout.data.service");
exports.LayoutDataService = layout_data_service_1.LayoutDataService;
var AMFormService_1 = require("./services/AMFormService");
exports.AMFormService = AMFormService_1.AMFormService;
var confirm_service_1 = require("./services/alert.dialog.modal/confirm.service");
exports.GlobConfirmService = confirm_service_1.GlobConfirmService;
var modal_service_1 = require("./services/alert.dialog.modal/modal.service");
exports.ModalService = modal_service_1.ModalService;
var cart_service_1 = require("./services/woocommerce/cart.service");
exports.CartService = cart_service_1.CartService;
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule,
            providers: [
                app_settings_service_1.AppSettingsService,
                auth_service_1.AuthGlobalService,
                user_global_service_1.UserGlobalService,
                flash_notices_1.FlashNoticeService,
                confirm_service_1.GlobConfirmService,
                AMFormService_1.AMFormService,
                modal_service_1.ModalService,
                cart_service_1.CartService,
                layout_data_service_1.LayoutDataService
            ]
        };
    };
    SharedModule = __decorate([
        core_1.NgModule({}), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map