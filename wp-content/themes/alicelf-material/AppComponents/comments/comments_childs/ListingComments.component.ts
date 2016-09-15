import { Component, DynamicComponentLoader } from '@angular/core';
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

	constructor( private postService: PostService,
	             private CommentsObj: CommentService,
	             private dynamicComponentLoader: DynamicComponentLoader ) {

	}

	replyAction( comment ) {
		console.log( comment );
	}

}