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
var AMFormService = (function () {
    function AMFormService() {
    }
    AMFormService.dataToPost = function (action, data) {
        var formData = new FormData();
        formData.append('action', action);
        if (Object.keys(data).length > 0) {
            for (var key in data) {
                formData.append(key, data[key]);
            }
        }
        return formData;
    };
    AMFormService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AMFormService);
    return AMFormService;
}());
exports.AMFormService = AMFormService;
//# sourceMappingURL=AMFormService.js.map