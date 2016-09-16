import { Component, Output, EventEmitter } from '@angular/core';
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

	@Output() launchConfirm = new EventEmitter();

	constructor( private postService: PostService,
	             private CommentsObj: CommentService ) {

	}

	replyAction( comment, index ) {
		console.log( comment, index );
	}

	editAction( comment, index ) {
		console.log( comment, index );
	}

	deleteAction( comment, index ) {
		this.launchConfirm.emit( {
			commentID: comment.ID,
			index    : index,
			launch   : true,
			confirmed: false
		} );
	}

}