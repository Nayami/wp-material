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
var modal_service_1 = require("../services/alert.dialog.modal/modal.service");
var componentPath = AMdefaults.themeurl + '/AppComponents/app/shared/components/views';
var ModalDialogComponent = (function () {
    function ModalDialogComponent(modal) {
        this.modal = modal;
    }
    ModalDialogComponent.prototype.confirmFunc = function () {
        var answer = this.modal.dialogObject;
        answer.dialogAnswer = true;
        this.modal.invokeAnswer(answer);
    };
    ModalDialogComponent.prototype.decline = function (event) {
        var target = event.target || event.srcElement || event.currentTarget, parentMatches = target.parentNode.nodeName === "A"
            && target.parentNode.attributes.dataDestroy !== undefined;
        if (target.attributes.dataDestroy !== undefined || parentMatches) {
            var answer = this.modal.dialogObject;
            answer.dialogAnswer = false;
            this.modal.invokeAnswer(answer);
        }
    };
    ModalDialogComponent = __decorate([
        core_1.Component({
            selector: 'ModalDialogComponent',
            templateUrl: componentPath + "/modal.component.html"
        }), 
        __metadata('design:paramtypes', [modal_service_1.ModalService])
    ], ModalDialogComponent);
    return ModalDialogComponent;
}());
exports.ModalDialogComponent = ModalDialogComponent;
//# sourceMappingURL=modal.component.js.map