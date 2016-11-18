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
var Subject_1 = require('rxjs/Subject');
var http_1 = require('@angular/http');
var FlashNoticeService = (function () {
    function FlashNoticeService(http) {
        var _this = this;
        this.http = http;
        this.notifications = [];
        this.notificationsChange = new Subject_1.Subject();
        http.get(AMdefaults.ajaxurl + "?action=ajx20160830020813")
            .map(function (response) { return response.json(); })
            .subscribe(function (availableNotices) {
            if (availableNotices) {
                for (var ntc in availableNotices.notices) {
                    var singleNotice = availableNotices.notices[ntc];
                    _this.attachNotifications({
                        message: singleNotice.message,
                        cssClass: 'mdl-color--blue-grey-300 mdl-color-text--blue-grey-900',
                        type: 'system',
                        systemID: ntc
                    });
                }
            }
        });
    }
    FlashNoticeService.prototype.attachNotifications = function (notice) {
        this.notifications.push(notice);
        this.notificationsChange.next(notice);
    };
    FlashNoticeService.prototype.unplugNotification = function (notif) {
        this.notifications.splice(this.notifications.indexOf(notif), 1);
        this.notificationsChange.next(notif);
    };
    FlashNoticeService.prototype.unplugNotificationByIndex = function (index) {
        this.notifications.splice(index, 1);
        this.notificationsChange.next(index);
    };
    FlashNoticeService.prototype.unplugSystemNotification = function (itemID) {
        var _this = this;
        this.http.get(AMdefaults.ajaxurl + "?action=ajx20162830022821&body_data=" + itemID)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) { return _this.endProcess = data; });
    };
    FlashNoticeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FlashNoticeService);
    return FlashNoticeService;
}());
exports.FlashNoticeService = FlashNoticeService;
//# sourceMappingURL=flash.notices.js.map