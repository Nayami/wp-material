import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { CommentModel } from '../model/CommentModel';
import { CommentsDataService } from '../model/CommentsDataService';

declare var AMdefaults: any;
var fileVersion   = '?tmplv=' + Date.now(),
    componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

@Component( {
	selector   : 'AMsingleComment',
	templateUrl: componentPath + 'views/single_comment.html' + fileVersion,
	providers  : [ CommentsDataService, HTTP_PROVIDERS ]
} )

export class ListingCommentsComponent {
	commentsAll: CommentModel[];

	constructor( private CommentsObj: CommentsDataService ) {
		this.CommentsObj.getComments()
		    .subscribe(commentsAll => this.commentsAll = commentsAll);
	}

	replyAction( comment ) {
		console.log( comment );
	}

}