import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { CommentService } from '../services/comment.service';
import { CommentInterface } from "../mocks/CommentInterface";
import { PostService } from "../services/post.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

@Component( {
	selector   : 'AMsingleComment',
	templateUrl: componentPath + 'views/single_comment.html'
} )

export class ListingCommentsComponent {
	commentsAll: CommentInterface[];

	constructor( private CommentsObj: CommentService, private postService:PostService ) {
		this.CommentsObj.getComments()
		    .subscribe(commentsAll => this.commentsAll = commentsAll);
	}

	replyAction( comment ) {
		console.log( comment );

	}

}