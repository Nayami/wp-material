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
var flash_notices_1 = require("../../shared/services/alert.dialog.modal/flash.notices");
var AMFormService_1 = require("../../shared/services/AMFormService");
var app_settings_service_1 = require("../../shared/services/app.settings.service");
var EnterEmailComponent = (function () {
    function EnterEmailComponent(flashes, http, appSettings) {
        this.flashes = flashes;
        this.http = http;
        this.appSettings = appSettings;
        this.launchInfoBack = new core_1.EventEmitter();
        this.bodyelem = document.getElementsByTagName('body')[0];
        this.progress = false;
        this.emailvalue = "";
        this.formInfo = {
            showclass: false,
            block: false
        };
    }
    EnterEmailComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var referLaunch = changes['launchINfo'].currentValue;
        if (referLaunch === true) {
            this.formInfo.block = true;
            this.bodyelem['classList'].add('aa-modal-overlay');
            setTimeout(function () {
                _this.formInfo.showclass = true;
            }, 30);
        }
    };
    /**
     * ==================== Handle Email submition ======================
     */
    EnterEmailComponent.prototype.submitProcess = function (value) {
        var _this = this;
        this.progress = true;
        if (EnterEmailComponent.validateEmail(value)) {
            this.confirmForm = this.sendData({ email: value, actionType: 'reset' })
                .subscribe(function (data) {
                switch (data.status) {
                    case 'notfound':
                        _this.flashes.attachNotifications({
                            message: 'User with this email doesn`t exist',
                            cssClass: 'mdl-color--red-200 mdl-color-text--red-900',
                            type: 'dismissable',
                        });
                        break;
                    case 'success':
                        _this.flashes.attachNotifications({
                            message: 'Check your email ' + data.email,
                            cssClass: 'mdl-color--green-200 mdl-color-text--green-900',
                            type: 'dismissable',
                        });
                        break;
                    default:
                        console.log("unknown");
                }
                _this.closeModal();
            });
        }
        else {
            this.closeModal();
            this.flashes.attachNotifications({
                message: 'Enter valid email!',
                cssClass: 'mdl-color--red-200 mdl-color-text--red-900',
                type: 'dismissable',
            });
        }
    };
    EnterEmailComponent.prototype.sendData = function (value) {
        var body = AMFormService_1.AMFormService.dataToPost("ajx20165728055701", value);
        return this.http.post(this.appSettings.settings.ajaxurl, body)['map'](function (response) { return response.json(); });
    };
    // close modal via click
    EnterEmailComponent.prototype.unplugModal = function (event) {
        var target = event.target || event.srcElement || event.currentTarget;
        if (target.attributes.dataDestroy !== undefined) {
            this.closeModal();
        }
    };
    EnterEmailComponent.prototype.closeModal = function () {
        var _this = this;
        this.formInfo.showclass = false;
        this.launchInfoBack.emit(false);
        this.emailvalue = "";
        this.progress = false;
        setTimeout(function () {
            _this.formInfo.block = false;
            _this.bodyelem['classList'].remove('aa-modal-overlay');
            _this.progress = false;
        }, 500);
    };
    EnterEmailComponent.prototype.ngOnDestroy = function () {
        if (this.confirmForm !== undefined)
            this.confirmForm.unsubscribe();
    };
    EnterEmailComponent.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], EnterEmailComponent.prototype, "launchINfo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EnterEmailComponent.prototype, "launchInfoBack", void 0);
    EnterEmailComponent = __decorate([
        core_1.Component({
            selector: 'enter-your-email',
            template: "\n\t<div id=\"forgot-pass-modal\" dataDestroy class=\"modal-backdrop\" [ngClass]=\"{show: formInfo.showclass, blockClass: formInfo.block}\" itemscope=\"aa-modal\" (click)=\"unplugModal($event)\">\n\t\t\t<div class=\"aa-modal-container\" data-animation=\"scale\">\n\n\t\t\t\t<div class=\"loader-line-modal\">\n\t\t\t\t\t<div *ngIf=\"progress\" class=\"mdl-progress mdl-js-progress mdl-progress__indeterminate\"></div>\n\t\t\t\t</div>\n\t\t\t\t<a class=\"mdl-button mdl-js-button mdl-button--icon destroy-button\">\n\t\t\t\t\t<i dataDestroy class=\"material-icons\">close</i>\n\t\t\t\t</a>\n\t\t\t\t<div class=\"modal-body-content mdl-typography--text-center\">\n\t\t\t\t\t<div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">\n\t\t\t\t\t\t<input [(ngModel)]=\"emailvalue\" class=\"mdl-textfield__input\" type=\"text\" id=\"resetpass-input\">\n\t\t\t\t\t\t<label class=\"mdl-textfield__label\" for=\"resetpass-input\">Enter Your Email</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button (click)=\"submitProcess(emailvalue)\" type=\"button\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect am-success-btn\">Send me restore password info</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [flash_notices_1.FlashNoticeService, http_1.Http, app_settings_service_1.AppSettingsService])
    ], EnterEmailComponent);
    return EnterEmailComponent;
}());
exports.EnterEmailComponent = EnterEmailComponent;
//# sourceMappingURL=enteremail.form.component.js.map