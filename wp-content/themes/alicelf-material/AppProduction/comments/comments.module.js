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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var forms_2 = require("@angular/forms");
var http_1 = require('@angular/http');
var comments_component_1 = require('./comments.component');
var Form_component_1 = require('./comments_childs/Form.component');
var ListingComments_component_1 = require('./comments_childs/ListingComments.component');
var CommentsDataService_1 = require("./model/CommentsDataService");
var post_service_1 = require("./services/post.service");
var CommentsModule = (function () {
    function CommentsModule() {
    }
    CommentsModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_2.ReactiveFormsModule
            ],
            declarations: [
                comments_component_1.CommentsComponent,
                Form_component_1.FormComponent,
                ListingComments_component_1.ListingCommentsComponent
            ],
            bootstrap: [comments_component_1.CommentsComponent],
            providers: [CommentsDataService_1.CommentsDataService, post_service_1.PostService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], CommentsModule);
    return CommentsModule;
}());
exports.CommentsModule = CommentsModule;
//# sourceMappingURL=comments.module.js.map