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
var GlobConfirmService = (function () {
    function GlobConfirmService() {
        this.confirmationChange = new Subject_1.Subject();
        this.bodyelem = document.getElementsByTagName('body')[0];
        this.display = false;
        this.showClass = false;
    }
    /**
     * ==================== Open dialog ======================
     */
    GlobConfirmService.prototype.launchConfirm = function (data) {
        var _this = this;
        this.confirmDialog = data;
        this.display = true;
        this.bodyelem['classList'].add('aa-modal-overlay');
        setTimeout(function () {
            _this.showClass = true;
        }, 50);
    };
    /**
     * ==================== Receive data from confirm.component ======================
     */
    GlobConfirmService.prototype.invokeAnswer = function (data) {
        this.confirmationChange.next(data);
    };
    /**
     * ==================== Destroy dialog =====================
     */
    GlobConfirmService.prototype.unplugConfirmation = function () {
        var _this = this;
        this.showClass = false;
        setTimeout(function () {
            _this.display = false;
            _this.bodyelem['classList'].remove('aa-modal-overlay');
        }, 500);
    };
    GlobConfirmService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GlobConfirmService);
    return GlobConfirmService;
}());
exports.GlobConfirmService = GlobConfirmService;
//# sourceMappingURL=confirm.service.js.map