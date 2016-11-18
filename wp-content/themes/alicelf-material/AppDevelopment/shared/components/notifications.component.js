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
var flash_notices_1 = require('../services/alert.dialog.modal/flash.notices');
var FlashNotificationsComponent = (function () {
    function FlashNotificationsComponent(flashes) {
        this.flashes = flashes;
        flashes.notificationsChange.subscribe(function () {
            if (flashes.notifications.length > 2) {
                var cntr_1 = flashes.notifications.length;
                if (cntr_1 > 3) {
                    var noticesInterval_1 = setInterval(function () {
                        flashes.unplugNotificationByIndex(cntr_1 - 1);
                        cntr_1--;
                        if (cntr_1 < 1) {
                            clearInterval(noticesInterval_1);
                        }
                    }, 2000);
                }
            }
        });
    }
    FlashNotificationsComponent.prototype.unplugNotice = function (item) {
        this.flashes.unplugNotification(item);
    };
    FlashNotificationsComponent.prototype.unplugSystemNotice = function (item, itemID) {
        this.flashes.unplugNotification(item);
        this.flashes.unplugSystemNotification(itemID);
    };
    FlashNotificationsComponent = __decorate([
        core_1.Component({
            selector: 'FlashNotificationsComponent',
            template: "\n\t<div id=\"header-notifications\">\n\t\t<ul>\n\t\t\t<li *ngFor=\"let flash of flashes.notifications\" [@flyInOut] class=\"{{flash.cssClass}}\">\n\t\t\t\t<a *ngIf=\"flash.type === 'dismissable'\" class=\"mdl-button mdl-js-button mdl-button--icon destroy-button\" (click)=\"unplugNotice(flash)\"><i class=\"material-icons\">close</i>\n\t\t\t\t</a>\n\t\t\t\t<a *ngIf=\"flash.type === 'system'\" class=\"mdl-button mdl-js-button mdl-button--icon destroy-button\" (click)=\"unplugSystemNotice(flash, flash.systemID)\"><i class=\"material-icons\">close</i>\n\t\t\t\t</a>\n\t\t\t\t{{flash.message}}\n\t\t\t\t<span *ngIf=\"flash.html\" [innerHTML]=\"flash.html\"></span>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\n\t",
            animations: [
                core_1.trigger('flyInOut', [
                    core_1.state('in', core_1.style({ transform: 'translateX(0)', opacity: 0 })),
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateX(40%)', opacity: 1 }),
                        core_1.animate('300ms ease-out')
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate('300ms ease-in', core_1.style({ transform: 'translateX(100%)', opacity: 0 }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [flash_notices_1.FlashNoticeService])
    ], FlashNotificationsComponent);
    return FlashNotificationsComponent;
}());
exports.FlashNotificationsComponent = FlashNotificationsComponent;
//# sourceMappingURL=notifications.component.js.map