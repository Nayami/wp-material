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
var forms_1 = require('@angular/forms');
var comment_service_1 = require('../services/comment.service');
var post_service_1 = require("../services/post.service");
var user_service_1 = require("../services/user.service");
var componentPath = AMdefaults.themeurl + '/AppComponents/comments/';
var FormComponent = (function () {
    function FormComponent(fb, user, postService, commentService) {
        var _this = this;
        this.fb = fb;
        this.user = user;
        this.postService = postService;
        this.commentService = commentService;
        this.currentCommenter = {
            ID: null,
            logged_in: false,
            user_nicename: null,
            user_email: null,
            user_url: null
        };
        this.commentForm = fb.group({
            "name": ["", forms_1.Validators.required],
            "email": ["", forms_1.Validators.required],
            "website": [""],
            "body": ["", forms_1.Validators.required]
        });
        user.getCurrentUser()
            .subscribe(function (response) {
            var fDefaults = {
                "name": response.logged_in ? response.user_nicename : "",
                "email": response.logged_in ? response.user_email : "",
                "website": response.logged_in ? response.user_url : "",
            };
            //this.commentForm.controls['name']
            _this.commentForm.controls['name'].setValue(fDefaults.name);
            _this.commentForm.controls['email'].setValue(fDefaults.email);
            _this.commentForm.controls['website'].setValue(fDefaults.website);
            _this.currentCommenter = response;
        });
    }
    FormComponent.prototype.ngOnInit = function () { };
    FormComponent.prototype.addReview = function () {
        var _this = this;
        if (this.commentForm.status === 'VALID') {
            var commentData = this.commentForm.value;
            commentData['postId'] = this.postService.postId;
            this.commentService.insertComment(commentData)
                .subscribe(function (response) {
                _this.commentService.addComment(response);
                _this.commentForm.reset();
            });
        }
    };
    FormComponent = __decorate([
        core_1.Component({
            selector: 'AMformComponent',
            templateUrl: componentPath + 'views/form.html',
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, user_service_1.UserService, post_service_1.PostService, comment_service_1.CommentService])
    ], FormComponent);
    return FormComponent;
}());
exports.FormComponent = FormComponent;
//# sourceMappingURL=Form.component.js.map