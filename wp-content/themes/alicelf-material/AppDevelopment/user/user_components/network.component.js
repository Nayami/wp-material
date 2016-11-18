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
var user_global_service_1 = require("../../shared/services/user.global.service");
var auth_service_1 = require("../../shared/services/auth.service");
var layout_data_service_1 = require("../../shared/services/layout.data.service");
var app_settings_service_1 = require("../../shared/services/app.settings.service");
var componentPath = AMdefaults.themeurl + '/AppComponents/app/user/views/';
var NetworkComponent = (function () {
    function NetworkComponent(router, layoutData, activatedRoute, appSettings, auth, userService) {
        var _this = this;
        this.router = router;
        this.layoutData = layoutData;
        this.activatedRoute = activatedRoute;
        this.appSettings = appSettings;
        this.auth = auth;
        this.userService = userService;
        this.spinner = false;
        this.authAndBehaviour = appSettings.settings.themeSettings.auth_info;
        if (!auth.loaded) {
            this.loadAuthInfo();
        }
        else {
            this.router.events.subscribe(function (event) {
                if (event.constructor['name'] === 'NavigationEnd') {
                    if (event.url === '/') {
                        _this.entranceBehaviour(_this.authAndBehaviour.network_purpose);
                    }
                }
            });
        }
    }
    NetworkComponent.prototype.loadAuthInfo = function () {
        var _this = this;
        return this.userService.getUser()
            .subscribe(function (user) {
            _this.auth.loaded = true;
            _this.auth.authorized = user.ID ? true : false;
            _this.userService.currentUser = user;
            _this.userService.checkAccessAndEmailConfirmation(user, _this.auth);
            // View another user profile
            var maybeUserSlug = _this.activatedRoute.snapshot.params['userslug'];
            if (!maybeUserSlug)
                _this.entranceBehaviour(_this.authAndBehaviour.network_purpose);
            _this.layoutData.invokeLoad();
        });
    };
    NetworkComponent.prototype.entranceBehaviour = function (networkPurpose) {
        switch (networkPurpose) {
            case "user_profile":
                if (!this.auth.authorized)
                    this.router.navigate(['/screen/auth']);
                break;
            case "users_listing":
                console.log("users_listing");
                break;
            case "users_activity":
                console.log("users_activity");
                break;
            default:
                this.router.navigate(['/screen/auth']);
        }
    };
    NetworkComponent = __decorate([
        core_1.Component({
            templateUrl: componentPath + 'network_entrance.html',
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
        __metadata('design:paramtypes', [router_1.Router, layout_data_service_1.LayoutDataService, router_1.ActivatedRoute, app_settings_service_1.AppSettingsService, auth_service_1.AuthGlobalService, user_global_service_1.UserGlobalService])
    ], NetworkComponent);
    return NetworkComponent;
}());
exports.NetworkComponent = NetworkComponent;
//# sourceMappingURL=network.component.js.map