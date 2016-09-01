declare var AMdefaults: any;

import { Component } from '@angular/core';
var fileVersion   = '?tmplv=' + Date.now(),
    componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

import { CommentModel } from '../model/CommentModel';
import { COMMENTS } from '../model/mocks';

@Component( {
	selector   : 'AMsingleComment',
	templateUrl: componentPath + 'views/single_comment.html' + fileVersion
} )

export class SingleCommentComponent {
	commentsAll: CommentModel[];

	ngOnInit() {
		this.commentsAll = COMMENTS;
	}
}