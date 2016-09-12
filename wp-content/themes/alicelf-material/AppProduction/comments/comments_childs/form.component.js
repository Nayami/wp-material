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
var forms_1 = require('@angular/forms');
var CommentsDataService_1 = require('../model/CommentsDataService');
var componentPath = AMdefaults.themeurl + '/AppComponents/comments/';
var FormComponent = (function () {
    function FormComponent(fb) {
        this.commentForm = fb.group({
            "name": ["", forms_1.Validators.required],
            "email": ["", forms_1.Validators.required],
            "website": [""],
            "body": ["", forms_1.Validators.required],
        });
    }
    FormComponent.prototype.addReview = function () {
        console.log(this.commentForm.value);
    };
    FormComponent.prototype.ngOnInit = function () { };
    FormComponent = __decorate([
        core_1.Component({
            selector: 'AMformComponent',
            templateUrl: componentPath + 'views/form.html',
            providers: [CommentsDataService_1.CommentsDataService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], FormComponent);
    return FormComponent;
}());
exports.FormComponent = FormComponent;
//# sourceMappingURL=Form.component.js.map