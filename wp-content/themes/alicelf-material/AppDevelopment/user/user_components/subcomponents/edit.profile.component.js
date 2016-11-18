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
var http_1 = require('@angular/http');
require('rxjs/Rx');
var forms_1 = require('@angular/forms');
var layout_data_service_1 = require("../../../shared/services/layout.data.service");
var auth_service_1 = require("../../../shared/services/auth.service");
var flash_notices_1 = require("../../../shared/services/alert.dialog.modal/flash.notices");
var app_settings_service_1 = require("../../../shared/services/app.settings.service");
var modal_service_1 = require("../../../shared/services/alert.dialog.modal/modal.service");
var confirm_service_1 = require("../../../shared/services/alert.dialog.modal/confirm.service");
var user_global_service_1 = require("../../../shared/services/user.global.service");
var auth_component_1 = require("../auth.component");
var AMFormService_1 = require("../../../shared/services/AMFormService");
var componentPath = AMdefaults.themeurl + '/AppComponents/app/user/views/';
var EditProfileComponent = (function () {
    function EditProfileComponent(layoutData, router, http, auth, activatedRoute, flashes, appSettings, modal, confirmService, userService, fbuilder) {
        this.layoutData = layoutData;
        this.router = router;
        this.http = http;
        this.auth = auth;
        this.activatedRoute = activatedRoute;
        this.flashes = flashes;
        this.appSettings = appSettings;
        this.modal = modal;
        this.confirmService = confirmService;
        this.userService = userService;
        this.fbuilder = fbuilder;
        this.spinner = false;
        this.owner = false;
        this.scopeUser = {
            ID: null
        };
    }
    EditProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner = true;
        this.layoutData.invokeLoad();
        this.routerParam = this.router.events.subscribe(function (event) {
            if (event.constructor['name'] === 'NavigationEnd') {
                var mbslug = _this.activatedRoute.params['value'], slug = "userslug" in mbslug ? mbslug.userslug : null;
                _this.userService.getUser(slug)
                    .subscribe(function (result) {
                    if (!result.ID && _this.auth.authorized)
                        _this.router.navigate(['/notfound']);
                    _this.scopeUser = result;
                    if (result.is_current_user) {
                        _this.loadEditForm(result);
                        _this.owner = true;
                    }
                    else {
                        _this.router.navigate(['/']);
                    }
                    _this.spinner = false;
                });
            }
        });
        // @ACTION : Logout event watch
        this.logoutConfirmation =
            this.confirmService.confirmationChange
                .subscribe(function (data) {
                if (data.id === _this.confirmService.currentID) {
                    if (data.dialogAnswer) {
                        _this.logoutAction();
                    }
                    _this.confirmService.unplugConfirmation();
                }
            });
    };
    // @ACTION : Logout event invoke
    EditProfileComponent.prototype.askLogoutConfirm = function () {
        var stamp = new Date().getTime();
        this.confirmService.currentID = stamp;
        this.confirmService.launchConfirm({
            id: stamp,
            dialogClass: 'danger-alert',
            dialogMessage: 'Are you sure want to logout?',
            dialogAnswer: null,
            showButtons: true
        });
    };
    EditProfileComponent.prototype.logoutAction = function () {
        var _this = this;
        this.spinner = true;
        this.userService.doLogout()
            .subscribe(function (data) {
            if (data === "logout_confirmed") {
                _this.userService.currentUser = null;
                _this.auth.authorized = false;
                _this.router.navigate(['/screen/auth']);
            }
            _this.flashes.attachNotifications({
                message: 'You are logged out.',
                cssClass: 'mdl-color--blue-200 mdl-color-text--blue-900',
                type: 'dismissable',
            });
            _this.spinner = false;
        });
    };
    EditProfileComponent.prototype.loadEditForm = function (user) {
        this.editFormHandler = this.fbuilder.group({
            email: [{ value: user.user_email, disabled: true }, [auth_component_1.AMAuthComponent.authEmailValidation]],
            slug: [user.slug, [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            pass: ["", [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            confirm: ["", [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
        });
    };
    EditProfileComponent.prototype.changeProfileSettings = function () {
        var _this = this;
        var formVal = this.editFormHandler.value;
        if (this.editFormHandler.status === "VALID") {
            if (formVal.pass !== formVal.confirm) {
                this.flashes.attachNotifications({
                    message: "Password and confirmation should match",
                    cssClass: 'mdl-color--blue-200 mdl-color-text--blue-900',
                    type: 'dismissable',
                });
                return;
            }
            var body = AMFormService_1.AMFormService.dataToPost("ajx20163519013508", formVal);
            this.http.post(AMdefaults.ajaxurl, body)['map'](function (response) { return response.json(); })
                .subscribe(function (data) {
                console.log(data);
                if (data.status === 'success') {
                    _this.scopeUser = data.user_data;
                    _this.userService.currentUser = data.user_data;
                    _this.router.navigate(['/' + _this.scopeUser.slug]);
                }
                else {
                }
            });
        }
        else {
            // @TODO: Handle Errors
            var ctrls = this.editFormHandler.controls;
            for (var control in ctrls) {
                var ctrl = ctrls[control];
                if (ctrl.errors) {
                    var thisErr = Object.keys(ctrl.errors)[0];
                    var controlMap = {
                        email: 'Login',
                        slug: 'Unique Slug',
                        pass: 'Password',
                        confirm: 'Password confirmation',
                    };
                    switch (thisErr) {
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
    EditProfileComponent.prototype.ngOnDestroy = function () {
        this.routerParam.unsubscribe();
        this.logoutConfirmation.unsubscribe();
    };
    EditProfileComponent = __decorate([
        core_1.Component({
            templateUrl: componentPath + 'profile.edit.component.html',
            animations: [
                core_1.trigger('renderEditProfile', [
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateY(40%)', opacity: 0 }),
                        core_1.animate('300ms ease-in', core_1.style({ transform: 'translateY(0)', opacity: 1 }))
                    ]),
                    core_1.transition('* => void', [
                        core_1.style({ transform: 'translateY(0)', opacity: 1 }),
                        core_1.animate('300ms ease-in', core_1.style({ transform: 'translateY(40%)', opacity: 0 }))
                    ])
                ])
            ],
        }), 
        __metadata('design:paramtypes', [layout_data_service_1.LayoutDataService, router_1.Router, http_1.Http, auth_service_1.AuthGlobalService, router_1.ActivatedRoute, flash_notices_1.FlashNoticeService, app_settings_service_1.AppSettingsService, modal_service_1.ModalService, confirm_service_1.GlobConfirmService, user_global_service_1.UserGlobalService, forms_1.FormBuilder])
    ], EditProfileComponent);
    return EditProfileComponent;
}());
exports.EditProfileComponent = EditProfileComponent;
//# sourceMappingURL=edit.profile.component.js.map