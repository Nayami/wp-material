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
var confirm_service_1 = require("../services/alert.dialog.modal/confirm.service");
var componentPath = AMdefaults.themeurl + '/AppComponents/app/shared/components/views';
var GlobConfirmComponent = (function () {
    function GlobConfirmComponent(confirmService) {
        this.confirmService = confirmService;
    }
    GlobConfirmComponent.prototype.confirmFunc = function () {
        var answer = this.confirmService.confirmDialog;
        answer.dialogAnswer = true;
        this.confirmService.invokeAnswer(answer);
    };
    GlobConfirmComponent.prototype.decline = function (event) {
        var target = event.target || event.srcElement || event.currentTarget, parentMatches = target.parentNode.nodeName === "A"
            && target.parentNode.attributes.dataDestroy !== undefined;
        if (target.attributes.dataDestroy !== undefined || parentMatches) {
            var answer = this.confirmService.confirmDialog;
            answer.dialogAnswer = false;
            this.confirmService.invokeAnswer(answer);
        }
    };
    GlobConfirmComponent = __decorate([
        core_1.Component({
            selector: 'GlobConfirmComponent',
            templateUrl: componentPath + '/alert.confirm.html'
        }), 
        __metadata('design:paramtypes', [confirm_service_1.GlobConfirmService])
    ], GlobConfirmComponent);
    return GlobConfirmComponent;
}());
exports.GlobConfirmComponent = GlobConfirmComponent;
//# sourceMappingURL=confirm.component.js.map