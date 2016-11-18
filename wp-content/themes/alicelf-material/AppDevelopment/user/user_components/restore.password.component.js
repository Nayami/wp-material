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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var user_global_service_1 = require("../../shared/services/user.global.service");
var auth_service_1 = require("../../shared/services/auth.service");
var flash_notices_1 = require("../../shared/services/alert.dialog.modal/flash.notices");
var layout_data_service_1 = require("../../shared/services/layout.data.service");
var componentPath = AMdefaults.themeurl + '/AppComponents/app/user/views/';
var RestorePasswordComponent = (function () {
    function RestorePasswordComponent(http, router, layoutData, flashes, auth, userService) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.layoutData = layoutData;
        this.flashes = flashes;
        this.auth = auth;
        this.userService = userService;
        this.checkdata = {
            data: null,
            loaded: false
        };
        this.newpassword = null;
        this.progress = false;
        this.progress = true;
        this.tokenSubscription = router
            .routerState.root.queryParams // token, email
            .subscribe(function (data) {
            _this.checkInfo(data)
                .subscribe(function (response) {
                if (response) {
                    _this.checkdata.data = response.reset_confirm_data;
                    if (response.next_step === 'authentificate') {
                        _this.userService.currentUser = response.user;
                        _this.auth.loaded = true;
                        _this.auth.authorized = true;
                        _this.flashes.attachNotifications({
                            message: 'Success, you are logged in!',
                            cssClass: 'mdl-color--green-200 mdl-color-text--green-900',
                            type: 'dismissable',
                        });
                        if (response.message) {
                            _this.flashes.attachNotifications({
                                message: response.message,
                                cssClass: 'mdl-color--blue-200 mdl-color-text--blue-900',
                                type: 'dismissable',
                            });
                        }
                        _this.router.navigate(['/']);
                        _this.layoutData.invokeLoad();
                    }
                }
                _this.checkdata.loaded = true;
                _this.layoutData.invokeLoad();
            });
            _this.progress = false;
        });
    }
    RestorePasswordComponent.prototype.checkInfo = function (data) {
        var headers = new http_1.Headers({ "Content-Type": "application/x-www-form-urlencoded" });
        var body = "action=ajx20161128111129&body_data=" + JSON.stringify(data);
        return this.http.post(AMdefaults.ajaxurl, body, { headers: headers })['map'](function (response) { return response.json(); });
    };
    RestorePasswordComponent.prototype.setNewPass = function () {
        var _this = this;
        if (this.newpassword) {
            if (this.newpassword.length > 5) {
                this.checkdata.data['newpass'] = this.newpassword;
                this.setNewPassRequest()
                    .subscribe(function (data) {
                    if (data.status === 'success') {
                        _this.auth.loaded = true;
                        _this.auth.authorized = data.user.ID ? true : false;
                        _this.userService.currentUser = data.user;
                        if (!_this.auth.authorized) {
                            _this.router.navigate(['/screen/auth']);
                        }
                        else {
                            _this.router.navigate(['/']);
                            _this.flashes.attachNotifications({
                                message: 'Success, you are logged in!',
                                cssClass: 'mdl-color--green-200 mdl-color-text--green-900',
                                type: 'dismissable',
                            });
                        }
                    }
                    else {
                        _this.flashes.attachNotifications({
                            message: 'Something wrong!',
                            cssClass: 'mdl-color--blue-grey-300 mdl-color-text--blue-grey-900',
                            type: 'dismissable',
                        });
                    }
                    _this.layoutData.invokeLoad();
                });
            }
            else {
                this.flashes.attachNotifications({
                    message: 'Password to short',
                    cssClass: 'mdl-color--blue-200 mdl-color-text--blue-900',
                    type: 'dismissable',
                });
            }
        }
        else {
            this.flashes.attachNotifications({
                message: 'Password cannot be blank',
                cssClass: 'mdl-color--orange-100 mdl-color-text--orange-900',
                type: 'dismissable',
            });
        }
    };
    RestorePasswordComponent.prototype.setNewPassRequest = function () {
        var headers = new http_1.Headers({ "Content-Type": "application/x-www-form-urlencoded" });
        var body = "action=ajx20160928110922&body_data=" + JSON.stringify(this.checkdata.data);
        return this.http.post(AMdefaults.ajaxurl, body, { headers: headers })['map'](function (response) { return response.json(); });
    };
    RestorePasswordComponent.prototype.ngOnDestroy = function () {
        this.tokenSubscription.unsubscribe();
    };
    RestorePasswordComponent = __decorate([
        core_1.Component({
            templateUrl: componentPath + 'restore.password.html',
            animations: [
                core_1.trigger('renderAuthTrigger', [
                    core_1.state('in', core_1.style({ transform: 'translateY(0)', opacity: 1 })),
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateY(20%)', opacity: 0 }),
                        core_1.animate('300ms ease')
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate('300ms ease-out', core_1.style({ transform: 'translateY(-20%)', opacity: 0 }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, layout_data_service_1.LayoutDataService, flash_notices_1.FlashNoticeService, auth_service_1.AuthGlobalService, user_global_service_1.UserGlobalService])
    ], RestorePasswordComponent);
    return RestorePasswordComponent;
}());
exports.RestorePasswordComponent = RestorePasswordComponent;
//# sourceMappingURL=restore.password.component.js.map