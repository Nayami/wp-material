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
var modal_service_1 = require("../../services/alert.dialog.modal/modal.service");
var user_global_service_1 = require("../../services/user.global.service");
// const body = AMFormService.dataToPost( "ajx20163519013508", formVal );
var AMFormService_1 = require("../../services/AMFormService");
var app_settings_service_1 = require("../../services/app.settings.service");
var flash_notices_1 = require("../../services/alert.dialog.modal/flash.notices");
var componentPath = AMdefaults.themeurl + '/AppComponents/app/shared/components/views';
var ChangeAvatarComponent = (function () {
    function ChangeAvatarComponent(http, modal, userService, flashes, appSettings) {
        var _this = this;
        this.http = http;
        this.modal = modal;
        this.userService = userService;
        this.flashes = flashes;
        this.appSettings = appSettings;
        this.progressline = false;
        this.ajaxurl = appSettings.settings.ajaxurl;
        var waitForuser = setInterval(function () {
            if (userService.currentUser) {
                clearInterval(waitForuser);
                _this.loadUserGallery();
            }
        }, 200);
    }
    ChangeAvatarComponent.prototype.loadUserGallery = function () {
        var _this = this;
        this.progressline = true;
        this.getUserMedia =
            this.userService.getUserMedia(this.userService.currentUser['ID'])
                .subscribe(function (response) {
                _this.userService.userMedia = response;
                _this.progressline = false;
            });
    };
    ChangeAvatarComponent.prototype.setAsProfile = function (media) {
        console.log(media);
        this.uploadedImage = media.source_url;
        console.log(this.uploadedImage);
        this.imageDbData = {
            alt: media.alt_text,
            attachment_ID: media.id,
            caption: media.caption,
            description: media.description,
            filepath: AMdefaults.uploadDir + media.media_details.file,
            href: media.link,
            src: media.source_url,
            title: media.title.rendered
        };
        this.waitForImage(this.uploadedImage);
    };
    ChangeAvatarComponent.prototype.waitForImage = function (newImageUrl) {
        var _this = this;
        if (newImageUrl === void 0) { newImageUrl = null; }
        var waitForimage = setInterval(function () {
            _this.imageObject = $('#uploadedImagePromise');
            var avatarWrapper = document.getElementById('upload-ava-holder');
            avatarWrapper.style.maxWidth = _this.imageObject.width() + "px";
            avatarWrapper.style.maxHeight = _this.imageObject.height() + "px";
            _this.cropOptions = {
                aspectRatio: 8 / 10,
                toggleDragModeOnDblclick: false,
                zoomable: false,
                // minContainerWidth          : 250,
                // minContainerHeight          : 373,
                preview: '.img-preview',
                crop: function (e) {
                    _this.cropData = {
                        offsetX: Math.round(e.x),
                        offsetY: Math.round(e.y),
                        width: Math.round(e.width),
                        height: Math.round(e.height),
                        rotate: e.rotate,
                        scaleX: e.scaleX,
                        scaleY: e.scaleY
                    };
                }
            };
            _this.imageObject.cropper(_this.cropOptions);
            if (newImageUrl) {
                _this.imageObject.cropper('replace', newImageUrl);
            }
            clearInterval(waitForimage);
        }, 50);
    };
    ChangeAvatarComponent.prototype.fileChange = function (fileInput) {
        var _this = this;
        this.progressline = true;
        if (fileInput.target.files && fileInput.target.files[0]) {
            var file = fileInput.target.files[0];
            var body = AMFormService_1.AMFormService.dataToPost("ajx20160628050625", {
                'newavatar': file
            });
            this.fileuploadSubscription = this.http.post(this.ajaxurl, body)['map'](function (response) { return response.json(); })
                .subscribe(function (data) {
                if (data.status === 'success') {
                    _this.imageDbData = data.data[0];
                    _this.uploadedImage = _this.imageDbData.src;
                    _this.waitForImage();
                }
                else {
                    _this.modal.invokeAnswer(false);
                    _this.modal.unplugModal();
                    switch (data.message) {
                        case "filesize_exceed":
                            _this.flashes.attachNotifications({
                                message: 'File is to large.',
                                cssClass: 'mdl-color--orange-100 mdl-color-text--orange-700',
                                type: 'dismissable',
                            });
                            break;
                        case "wrong_type":
                            _this.flashes.attachNotifications({
                                message: 'Wrong File Type (only .jpg/.jpeg and .png allowed)',
                                cssClass: 'mdl-color--orange-100 mdl-color-text--orange-700',
                                type: 'dismissable',
                            });
                            break;
                        default:
                            console.log("FAIL: ", data.message);
                            _this.flashes.attachNotifications({
                                message: 'Something wrong. File Not loaded!',
                                cssClass: 'mdl-color--red-200 mdl-color-text--red-900',
                                type: 'dismissable',
                            });
                    }
                }
                _this.progressline = false;
            });
        }
    };
    ChangeAvatarComponent.prototype.cropImage = function () {
        var _this = this;
        this.progressline = true;
        var body = AMFormService_1.AMFormService.dataToPost("ajx20162129102106", {
            imageDbData: JSON.stringify(this.imageDbData),
            cropData: JSON.stringify(this.cropData)
        });
        this.submitCrop = this.http.post(this.ajaxurl, body)['map'](function (response) { return response.json(); })
            .subscribe(function (data) {
            if (data.status === 'success') {
                _this.modal.invokeAnswer({
                    id: _this.modal.currentID,
                    status: 'success',
                    newImageData: data.newImageData
                });
            }
            else {
                _this.modal.invokeAnswer(false);
            }
            _this.progressline = false;
        });
    };
    ChangeAvatarComponent.prototype.ngOnDestroy = function () {
        if (this.fileuploadSubscription)
            this.fileuploadSubscription.unsubscribe();
        if (this.submitCrop)
            this.submitCrop.unsubscribe();
        if (this.submitCrop)
            this.getUserMedia.unsubscribe();
    };
    ChangeAvatarComponent = __decorate([
        core_1.Component({
            selector: 'ChangeAvatar',
            templateUrl: componentPath + "/changeavatar.modal.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, modal_service_1.ModalService, user_global_service_1.UserGlobalService, flash_notices_1.FlashNoticeService, app_settings_service_1.AppSettingsService])
    ], ChangeAvatarComponent);
    return ChangeAvatarComponent;
}());
exports.ChangeAvatarComponent = ChangeAvatarComponent;
//# sourceMappingURL=changeAvatar.component.js.map