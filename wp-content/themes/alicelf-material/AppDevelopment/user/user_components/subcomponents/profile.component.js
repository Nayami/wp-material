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
require('rxjs/Rx');
var auth_service_1 = require("../../../shared/services/auth.service");
var flash_notices_1 = require("../../../shared/services/alert.dialog.modal/flash.notices");
var app_settings_service_1 = require("../../../shared/services/app.settings.service");
var modal_service_1 = require("../../../shared/services/alert.dialog.modal/modal.service");
var confirm_service_1 = require("../../../shared/services/alert.dialog.modal/confirm.service");
var user_global_service_1 = require("../../../shared/services/user.global.service");
var componentPath = AMdefaults.themeurl + '/AppComponents/app/user/views/';
var SingleProfileComponent = (function () {
    function SingleProfileComponent(router, auth, activatedRoute, flashes, appSettings, modal, confirmService, userService) {
        this.router = router;
        this.auth = auth;
        this.activatedRoute = activatedRoute;
        this.flashes = flashes;
        this.appSettings = appSettings;
        this.modal = modal;
        this.confirmService = confirmService;
        this.userService = userService;
        this.spinner = false;
        this.owner = false;
        this.scopeUser = {
            ID: null
        };
    }
    SingleProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routerParam = this.router.events.subscribe(function (event) {
            if (event.constructor['name'] === 'NavigationEnd') {
                var mbslug = _this.activatedRoute.params['value'], slug_1 = "userslug" in mbslug ? mbslug.userslug : null;
                _this.userService.getUser(slug_1)
                    .subscribe(function (result) {
                    if (!result.ID && _this.auth.authorized) {
                        _this.router.navigate(['/notfound']);
                    }
                    _this.scopeUser = result;
                    _this.currentUserSlug = slug_1;
                    if (result.is_current_user)
                        _this.owner = true;
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
        // @ACTION : Change Avatar Event watch
        this.changeAvatar =
            this.modal.modalChange
                .subscribe(function (data) {
                if (data.id === _this.modal.currentID) {
                    if (!data.dialogAnswer) {
                        _this.modal.unplugModal();
                    }
                    if (data.status === 'success') {
                        _this.updatePicture(data.newImageData.src);
                    }
                }
            });
    };
    SingleProfileComponent.prototype.updatePicture = function (dataSrc) {
        this.scopeUser.network_meta.user_media.avatar_url = dataSrc;
        this.userService.currentUser['network_meta'].user_media.avatar_url = dataSrc;
        this.flashes.attachNotifications({
            message: 'You may need to refresh the page for view correct size of your userpic',
            cssClass: 'mdl-color--blue-grey-300  mdl-color-text--blue-grey-900',
            type: 'dismissable',
        });
    };
    // @ACTION : Logout event invoke
    SingleProfileComponent.prototype.askLogoutConfirm = function () {
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
    SingleProfileComponent.prototype.switchUser = function (user) {
        var _this = this;
        var u = user.length > 0 ? user : null;
        if (this.currentUserSlug !== u) {
            this.scopeUser = { ID: null };
            setTimeout(function () {
                _this.router.navigate([user]);
            }, 50);
        }
    };
    SingleProfileComponent.prototype.logoutAction = function () {
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
    /**
     * ==================== Change avatar dialog ======================
     */
    SingleProfileComponent.prototype.IwantToChangeAvatar = function () {
        var stamp = new Date().getTime();
        this.modal.currentID = stamp;
        this.modal.launchModal({
            id: stamp,
            dialogClass: 'change-avatar-dialog',
            dialogCmponent: 'ChangeAvatar',
            dialogAnswer: null,
            showButtons: false,
            dialogType: 'simple',
            dialogAnimation: 'scale'
        });
    };
    SingleProfileComponent.prototype.ngOnDestroy = function () {
        this.routerParam.unsubscribe();
        this.logoutConfirmation.unsubscribe();
        this.changeAvatar.unsubscribe();
    };
    SingleProfileComponent = __decorate([
        core_1.Component({
            selector: 'am-single-profile',
            templateUrl: componentPath + 'profile.component.html',
            animations: [
                core_1.trigger('renderProfile', [
                    core_1.state('in', core_1.style({ transform: 'translateY(0)', opacity: 1 })),
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateY(20%)', opacity: 0 }),
                        core_1.animate('300ms ease')
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate('300ms ease-out', core_1.style({ transform: 'translateY(20%)', opacity: 0 }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthGlobalService, router_1.ActivatedRoute, flash_notices_1.FlashNoticeService, app_settings_service_1.AppSettingsService, modal_service_1.ModalService, confirm_service_1.GlobConfirmService, user_global_service_1.UserGlobalService])
    ], SingleProfileComponent);
    return SingleProfileComponent;
}());
exports.SingleProfileComponent = SingleProfileComponent;
//# sourceMappingURL=profile.component.js.map