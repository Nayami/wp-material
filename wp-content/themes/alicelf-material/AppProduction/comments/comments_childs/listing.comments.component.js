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
var CommentsDataService_1 = require('../model/CommentsDataService');
var fileVersion = '?tmplv=' + Date.now(), componentPath = AMdefaults.themeurl + '/AppComponents/comments/';
var ListingCommentComponent = (function () {
    function ListingCommentComponent(CommentsObj) {
        this.CommentsObj = CommentsObj;
    }
    ListingCommentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.CommentsObj.getComments()
            .subscribe(function (commentsAll) { return _this.commentsAll = commentsAll; });
    };
    ListingCommentComponent.prototype.replyAction = function (comment) {
        console.log(comment);
    };
    ListingCommentComponent = __decorate([
        core_1.Component({
            selector: 'AMsingleComment',
            templateUrl: componentPath + 'views/single_comment.html' + fileVersion,
            providers: [CommentsDataService_1.CommentsDataService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [CommentsDataService_1.CommentsDataService])
    ], ListingCommentComponent);
    return ListingCommentComponent;
}());
exports.ListingCommentComponent = ListingCommentComponent;
//# sourceMappingURL=listing.comments.component.js.map