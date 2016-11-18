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
var router_1 = require("@angular/router");
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var flash_notices_1 = require("../../shared/services/alert.dialog.modal/flash.notices");
var user_global_service_1 = require("../../shared/services/user.global.service");
var auth_service_1 = require("../../shared/services/auth.service");
var app_settings_service_1 = require("../../shared/services/app.settings.service");
var layout_data_service_1 = require("../../shared/services/layout.data.service");
var AMFormService_1 = require("../../shared/services/AMFormService");
var componentPath = AMdefaults.themeurl + '/AppComponents/app/user/views/';
var AMAuthComponent = (function () {
    function AMAuthComponent(router, http, appSettings, userService, auth, layoutData, flashes, fbuilder) {
        this.router = router;
        this.http = http;
        this.appSettings = appSettings;
        this.userService = userService;
        this.auth = auth;
        this.layoutData = layoutData;
        this.flashes = flashes;
        this.fbuilder = fbuilder;
        this.forgotEmitter = false;
        this.strategy = null;
        this.spinner = false;
        if (!auth.loaded) {
            this.loadAuthInfo();
        }
        else {
            if (this.auth.authorized)
                this.router.navigate(['/']);
        }
        this.loginFormHandler = this.fbuilder.group({
            fname: ["", [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            passw: ["", forms_1.Validators.required]
        });
        if (appSettings.settings.themeSettings.auth_info.registration_info === 'yes') {
            this.strategy = appSettings.settings.themeSettings.auth_info.registration_strategy;
            this.setRegistrationForm();
        }
    }
    AMAuthComponent.authEmailValidation = function (control) {
        var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!pattern.test(control.value)) {
            return { email: true };
        }
        return null;
    };
    /**
     * ==================== Set form rules ======================
     */
    AMAuthComponent.prototype.setRegistrationForm = function () {
        switch (this.strategy) {
            case "no_confirm":
                this.registerFormHandler = this.fbuilder.group({
                    login: ["", [AMAuthComponent.authEmailValidation]],
                    passw: ["", [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
                    confirm: ["", forms_1.Validators.required]
                });
                break;
            case "confirm_before":
                this.registerFormHandler = this.fbuilder.group({
                    login: ["", AMAuthComponent.authEmailValidation]
                });
                break;
            case "confirm_after":
                this.registerFormHandler = this.fbuilder.group({
                    login: ["", AMAuthComponent.authEmailValidation],
                    passw: ["", [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
                    confirm: ["", forms_1.Validators.required]
                });
                break;
            default:
                console.log("unknown");
        }
    };
    AMAuthComponent.prototype.loadAuthInfo = function () {
        var _this = this;
        return this.userService.getUser()
            .subscribe(function (user) {
            _this.auth.loaded = true;
            _this.auth.authorized = user.ID ? true : false;
            _this.userService.currentUser = user;
            if (_this.auth.authorized)
                _this.router.navigate(['/']);
            _this.layoutData.invokeLoad();
        });
    };
    /**
     * ==================== Login Action ======================
     */
    AMAuthComponent.prototype.doLogin = function () {
        var _this = this;
        if (this.loginFormHandler.status === "VALID") {
            this.spinner = true;
            this.loginSubscription =
                this.auth.authorizeMe(this.loginFormHandler.value)
                    .subscribe(function (data) {
                    switch (data.message) {
                        case 'success':
                            _this.userService.currentUser = data.user;
                            _this.auth.loaded = true;
                            _this.auth.authorized = true;
                            _this.router.navigate(['/']);
                            _this.flashes.attachNotifications({
                                message: 'Success !',
                                cssClass: 'mdl-color--green-200 mdl-color-text--green-900',
                                type: 'dismissable',
                            });
                            break;
                        case 'notfound':
                            _this.flashes.attachNotifications({
                                message: 'User not found',
                                cssClass: 'mdl-color--red-200 mdl-color-text--red-900',
                                type: 'dismissable',
                            });
                            break;
                        case 'notmatch':
                            _this.flashes.attachNotifications({
                                message: 'Password not match',
                                cssClass: 'mdl-color--orange-100 mdl-color-text--orange-700',
                                type: 'dismissable',
                            });
                            break;
                        default:
                            console.log(data);
                    }
                    _this.spinner = false;
                });
        }
    };
    /**
     * ==================== Registration Action ======================
     */
    AMAuthComponent.prototype.doRegister = function () {
        var _this = this;
        if (this.registerFormHandler.status === "VALID") {
            var regValues = this.registerFormHandler.value;
            var body = AMFormService_1.AMFormService.dataToPost("ajx20162929092956", regValues);
            if (this.strategy === 'confirm_before') {
                this.cfbSubscription =
                    this.http.post(AMdefaults.ajaxurl, body)['map'](function (response) { return response.json(); })
                        .subscribe(function (data) {
                        switch (data.status) {
                            case "user_exists":
                                _this.flashes.attachNotifications({
                                    message: 'Sorry, this email already taken!',
                                    cssClass: 'mdl-color--orange-100 mdl-color-text--orange-900',
                                    type: 'dismissable',
                                });
                                break;
                            case "email_fail":
                                _this.flashes.attachNotifications({
                                    message: 'Something happend with email server, try again later',
                                    cssClass: 'mdl-color--orange-100 mdl-color-text--orange-900',
                                    type: 'dismissable',
                                });
                                break;
                            case "success":
                                if (data.check_mail) {
                                    _this.flashes.attachNotifications({
                                        message: 'Check your email for confirmation link!',
                                        cssClass: 'mdl-color--blue-grey-300  mdl-color-text--blue-grey-900',
                                        type: 'dismissable',
                                    });
                                }
                                break;
                            default:
                                console.log(data);
                        }
                        _this.registerFormHandler.controls['login'].setValue("", {});
                    });
            }
            else {
                /**
                 * REGISTRATION FOR confirm after and without confirm
                 */
                if (regValues.passw === regValues.confirm) {
                    this.cfaSubscription =
                        this.http.post(AMdefaults.ajaxurl, body)['map'](function (response) { return response.json(); })
                            .subscribe(function (data) {
                            switch (data.status) {
                                case "user_exists":
                                    _this.flashes.attachNotifications({
                                        message: 'Sorry, this email already taken!',
                                        cssClass: 'mdl-color--blue-200 mdl-color-text--blue-900',
                                        type: 'dismissable',
                                    });
                                    break;
                                case "success":
                                    _this.flashes.attachNotifications({
                                        message: 'You successfully registered!',
                                        cssClass: 'mdl-color--green-200 mdl-color-text--green-900',
                                        type: 'dismissable',
                                    });
                                    if (data.check_mail) {
                                        _this.flashes.attachNotifications({
                                            message: 'Check your email',
                                            cssClass: 'mdl-color--blue-grey-300 mdl-color-text--blue-grey-900',
                                            type: 'dismissable',
                                        });
                                    }
                                    _this.userService.currentUser = data.user;
                                    _this.auth.loaded = true;
                                    _this.auth.authorized = true;
                                    _this.router.navigate(['/']);
                                    break;
                                default:
                                    console.log(data);
                            }
                            _this.registerFormHandler.controls['login'].setValue("", {});
                            _this.registerFormHandler.controls['passw'].setValue("", {});
                            _this.registerFormHandler.controls['confirm'].setValue("", {});
                        });
                }
                else {
                    this.flashes.attachNotifications({
                        message: 'Password and confirmation should match!',
                        cssClass: 'mdl-color--orange-100 mdl-color-text--orange-900',
                        type: 'dismissable',
                    });
                }
            }
        }
        else {
            /**
             * ==================== Handle Errors ======================
             * 01.10.2016
             */
            var ctrls = this.registerFormHandler.controls;
            for (var control in ctrls) {
                var ctrl = ctrls[control];
                if (ctrl.errors) {
                    var thisErr = Object.keys(ctrl.errors)[0];
                    var controlMap = {
                        login: 'Login',
                        passw: 'Password',
                        confirm: 'Password confirmation'
                    };
                    switch (thisErr) {
                        case "email":
                            this.flashes.attachNotifications({
                                message: 'Provide correct email for ' + controlMap[control],
                                cssClass: 'mdl-color--red-200 mdl-color-text--red-900',
                                type: 'dismissable',
                            });
                            break;
                        case "required":
                            this.flashes.attachNotifications({
                                message: controlMap[control] + " Cannot be blank",
                                cssClass: 'mdl-color--red-200 mdl-color-text--red-900',
                                type: 'dismissable',
                            });
                            break;
                        case "minlength":
                            this.flashes.attachNotifications({
                                message: controlMap[control] + " Too Short",
                                cssClass: 'mdl-color--red-200 mdl-color-text--red-900',
                                type: 'dismissable',
                            });
                            break;
                        default:
                            this.flashes.attachNotifications({
                                message: 'Fill correct all fields!',
                                cssClass: 'mdl-color--red-200 mdl-color-text--red-900',
                                type: 'dismissable',
                            });
                    }
                }
            }
        }
    };
    /**
     * ==================== Forgot Password click ======================
     */
    AMAuthComponent.prototype.invokeForgotPassword = function () {
        this.forgotEmitter = true;
    };
    AMAuthComponent.prototype.launchInfoBack = function (event) {
        this.forgotEmitter = event;
    };
    AMAuthComponent.prototype.ngOnDestroy = function () {
        if (this.loginSubscription)
            this.loginSubscription.unsubscribe();
        if (this.cfbSubscription)
            this.cfbSubscription.unsubscribe();
        if (this.cfaSubscription)
            this.cfaSubscription.unsubscribe();
    };
    AMAuthComponent = __decorate([
        core_1.Component({
            templateUrl: componentPath + 'auth.login.register.html',
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
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, app_settings_service_1.AppSettingsService, user_global_service_1.UserGlobalService, auth_service_1.AuthGlobalService, layout_data_service_1.LayoutDataService, flash_notices_1.FlashNoticeService, forms_1.FormBuilder])
    ], AMAuthComponent);
    return AMAuthComponent;
}());
exports.AMAuthComponent = AMAuthComponent;
//# sourceMappingURL=auth.component.js.map