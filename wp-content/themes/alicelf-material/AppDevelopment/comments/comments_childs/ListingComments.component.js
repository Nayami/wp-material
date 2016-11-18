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
var confirm_service_1 = require("../../shared/services/alert.dialog.modal/confirm.service");
var componentPath = AMdefaults.themeurl + '/AppComponents/app/comments/';
var ListingCommentsComponent = (function () {
    function ListingCommentsComponent(formBuild, postService, confirmService, CommentsObj) {
        this.formBuild = formBuild;
        this.postService = postService;
        this.confirmService = confirmService;
        this.CommentsObj = CommentsObj;
        this.userId = AMdefaults.currentUser;
        this.maybedestroy = {
            id: null,
            index: null
        };
        this.editForm = formBuild.group({});
    }
    ListingCommentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Watch delete comment approove
        this.delSubscription =
            this.confirmService.confirmationChange
                .subscribe(function (data) {
                if (data.id === _this.confirmService.currentID) {
                    if (data.dialogAnswer) {
                        _this.CommentsObj.delAction(_this.maybedestroy);
                    }
                    _this.confirmService.unplugConfirmation();
                }
            });
    };
    // @TODO: Create Reply action
    ListingCommentsComponent.prototype.replyAction = function (comment, index) {
        //console.log( comment, index );
    };
    /**
     * ==================== UPDATE ACTION ======================
     * 16.09.2016
     */
    ListingCommentsComponent.prototype.updateReview = function () {
        var _this = this;
        if (this.editForm.status === "VALID") {
            this.currentEditComment.content = this.editForm.value.updatedValueReview;
            this.CommentsObj.updateComment(this.currentEditComment)
                .subscribe(function (response) {
                if (response.status === 'success') {
                    _this.cancelEdit();
                }
            });
        }
    };
    // OPEN EDIT TEXTAREA
    ListingCommentsComponent.prototype.editAction = function (comment) {
        this.currentlyEdit = comment.ID;
        this.currentlyEditText = comment.content;
        this.currentEditComment = comment;
        this.editForm = this.formBuild.group({
            "updatedValueReview": [
                this.currentlyEditText,
                forms_1.Validators.required
            ]
        });
    };
    // CANCEL EDIT
    ListingCommentsComponent.prototype.cancelEdit = function () {
        this.currentlyEdit = 0;
        this.currentlyEditText = null;
    };
    // Ask Confirmaiton
    ListingCommentsComponent.prototype.deleteAction = function (comment, index) {
        this.maybedestroy.id = comment.ID;
        this.maybedestroy.index = index;
        var stamp = new Date().getTime();
        this.confirmService.currentID = stamp;
        this.confirmService.launchConfirm({
            id: stamp,
            dialogClass: 'warning-alert',
            dialogMessage: 'Are you sure you wand delete this comment?',
            dialogAnswer: null,
            showButtons: true
        });
    };
    ListingCommentsComponent.prototype.ngOnDestroy = function () {
        this.delSubscription.unsubscribe();
    };
    ListingCommentsComponent = __decorate([
        core_1.Component({
            selector: 'listingComments',
            templateUrl: componentPath + 'views/listing_comments.html',
            animations: [
                core_1.trigger('flyInOut', [
                    core_1.state('in', core_1.style({ transform: 'translateY(0)', opacity: 0 })),
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateY(-40%)', opacity: 1 }),
                        core_1.animate('300ms ease-in')
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate('300ms ease-out', core_1.style({ transform: 'translateX(100%)', opacity: 0 }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, post_service_1.PostService, confirm_service_1.GlobConfirmService, comment_service_1.CommentService])
    ], ListingCommentsComponent);
    return ListingCommentsComponent;
}());
exports.ListingCommentsComponent = ListingCommentsComponent;
//# sourceMappingURL=ListingComments.component.js.map