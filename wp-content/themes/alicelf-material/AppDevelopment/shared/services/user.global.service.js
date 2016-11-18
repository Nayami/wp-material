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
var http_1 = require('@angular/http');
require('rxjs/Rx');
var auth_service_1 = require("./auth.service");
var flash_notices_1 = require("./alert.dialog.modal/flash.notices");
var UserGlobalService = (function () {
    function UserGlobalService(http, auth, flashes) {
        this.http = http;
        this.auth = auth;
        this.flashes = flashes;
        this.allUsers = [];
        this.userMedia = [];
    }
    /**
     * ==================== If not slug will be current user ======================
     * 06.10.2016
     */
    UserGlobalService.prototype.getUser = function (slug) {
        if (slug === void 0) { slug = null; }
        var queryUrl = AMdefaults.ajaxurl + "?action=ajx20163917023918";
        if (slug)
            queryUrl += "&by_slug=" + slug;
        return this.http.get(queryUrl)['map'](function (response) { return response.json(); });
    };
    UserGlobalService.prototype.checkAccessAndEmailConfirmation = function (user, auth) {
        var _this = this;
        var htmlButton = '<a class="mdl-color-text--blue-grey-900" href="' + AMdefaults.networkEndpoint + '?am_confirm_email=confirm">Confirm Now!</a>';
        return this.http.get(AMdefaults.ajaxurl + '?action=ajx20162128122131')['map'](function (response) { return response.json(); })
            .subscribe(function (data) {
            var strategy = data.auth_info.registration_strategy;
            if (auth.authorized && user.network_meta.email_confirmed !== 'confirmed') {
                if (strategy !== 'no_confirm') {
                    _this.flashes.attachNotifications({
                        message: 'Your email not confirmed yet!',
                        cssClass: 'mdl-color--blue-grey-300 mdl-color-text--blue-grey-900',
                        type: 'dismissable',
                        html: htmlButton
                    });
                }
            }
        });
    };
    UserGlobalService.prototype.ngOnDestroy = function () {
        this.userSubscription.unsubscribe();
    };
    /**
     * ==================== Logout ======================
     * 01.10.2016
     */
    UserGlobalService.prototype.doLogout = function () {
        return this.http.get(AMdefaults.ajaxurl + '?action=ajx20160101040141')['map'](function (response) { return response.json(); });
    };
    UserGlobalService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthGlobalService, flash_notices_1.FlashNoticeService])
    ], UserGlobalService);
    return UserGlobalService;
}());
exports.UserGlobalService = UserGlobalService;
//# sourceMappingURL=user.global.service.js.map