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
var post_service_1 = require("../services/post.service");
var AMFormService_1 = require("../../shared/services/AMFormService");
require('rxjs/Rx');
var CommentService = (function () {
    function CommentService(http, postService) {
        this.http = http;
        this.postService = postService;
        this.commentsAll = [];
    }
    CommentService.prototype.addComment = function (data) {
        this.commentsAll.push(data);
    };
    /**
     * ==================== GET COMMENTS ======================
     */
    CommentService.prototype.getComments = function (postId) {
        var queryUrl = AMdefaults.baseurl + "/wp-json/wp/v2/comments?order=asc&post=" + postId;
        return this.http.get(queryUrl)['map'](function (response) { return response.json(); });
    };
    /**
     * ==================== UPDATE ======================
     */
    CommentService.prototype.updateComment = function (data) {
        var body = AMFormService_1.AMFormService.dataToPost("ajx20161116071151", data);
        return this.http.post(AMdefaults.ajaxurl, body)['map'](function (response) { return response.json(); });
    };
    /**
     * ==================== INSERT ======================
     */
    CommentService.prototype.insertComment = function (data) {
        var body = AMFormService_1.AMFormService.dataToPost("ajx20163414083403", data);
        return this.http.post(AMdefaults.ajaxurl, body)['map'](function (response) { return response.json(); });
    };
    /**
     * ==================== DELETE ======================
     */
    CommentService.prototype.delAction = function (comment) {
        var _this = this;
        this.delSubscription =
            this.destroyComment(comment).subscribe(function (data) {
                if (data.status === 'success') {
                    _this.commentsAll.splice(data.index, 1);
                }
            });
    };
    CommentService.prototype.destroyComment = function (data) {
        var headers = new http_1.Headers({ "Content-Type": "application/x-www-form-urlencoded" });
        var body = "action=ajx20165916125929&body_data=" + JSON.stringify(data);
        return this.http.post(AMdefaults.ajaxurl, body, { headers: headers })['map'](function (response) { return response.json(); });
    };
    CommentService.prototype.ngOnDestroy = function () {
        this.delSubscription.unsubscribe();
    };
    // Convert object to string
    CommentService.requestToString = function (object, action) {
        if (action === void 0) { action = null; }
        var str = action ? "action=" + action + "&" : '';
        for (var obj in object) {
            var value = typeof object[obj] === 'object' ?
                JSON.stringify(object[obj])
                : object[obj];
            str += obj + "=" + value + "&";
        }
        return str.substring(0, str.length - 1);
    };
    CommentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, post_service_1.PostService])
    ], CommentService);
    return CommentService;
}());
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map