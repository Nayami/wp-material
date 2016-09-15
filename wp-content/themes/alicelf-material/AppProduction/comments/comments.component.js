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
var post_service_1 = require("./services/post.service");
var componentPath = AMdefaults.themeurl + '/AppComponents/comments/';
var CommentsComponent = (function () {
    function CommentsComponent(elm, postService) {
        this.postService = postService;
        this.title = 'Leave a Reply';
        this.postService.setPostId(parseInt(elm.nativeElement.getAttribute('datapostid')));
    }
    CommentsComponent.prototype.ngOnInit = function () { };
    CommentsComponent = __decorate([
        core_1.Component({
            selector: 'AMreviewShell',
            templateUrl: componentPath + 'views/shell.html'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, post_service_1.PostService])
    ], CommentsComponent);
    return CommentsComponent;
}());
exports.CommentsComponent = CommentsComponent;
//# sourceMappingURL=comments.component.js.map