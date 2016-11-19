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
var comment_service_1 = require('./services/comment.service');
var post_service_1 = require("./services/post.service");
require('rxjs/Rx');
var componentPath = AMdefaults.themeurl + '/AppComponents/app/comments/';
var CommentsComponent = (function () {
    function CommentsComponent(elm, postService, commentsService) {
        this.postService = postService;
        this.commentsService = commentsService;
        this.title = 'Leave a Reply';
        this.postService.postId = parseInt(elm.nativeElement.getAttribute('datapostid'));
        this.getCommentsSubscription =
            commentsService.getComments(this.postService.postId)
                .subscribe(function (response) {
                if (response.length > 0) {
                    commentsService.commentsAll = response;
                    console.log(response);
                }
            });
        this.postSubscription =
            postService.getPost(this.postService.postId)
                .subscribe(function (response) {
                postService.post = response;
            });
    }
    CommentsComponent.prototype.ngOnDestroy = function () {
        this.getCommentsSubscription.unsubscribe();
        this.postSubscription.unsubscribe();
    };
    CommentsComponent = __decorate([
        core_1.Component({
            selector: 'AMreviewShell',
            templateUrl: componentPath + 'views/shell.html',
            animations: [
                core_1.trigger('appearForm', [
                    core_1.transition('void => *', [
                        core_1.style({ opacity: 0 }),
                        core_1.animate('300ms ease-in', core_1.style({ opacity: 1 }))
                    ]),
                    core_1.transition('* => void', [
                        core_1.style({ opacity: 1 }),
                        core_1.animate('300ms ease-in', core_1.style({ opacity: 0 }))
                    ])
                ])
            ],
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, post_service_1.PostService, comment_service_1.CommentService])
    ], CommentsComponent);
    return CommentsComponent;
}());
exports.CommentsComponent = CommentsComponent;
//# sourceMappingURL=comments.component.js.map