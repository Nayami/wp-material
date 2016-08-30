import { Component } from '@angular/core';
var fileVersion = '?tmplv=' + Date.now(),
	componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

// AMdefaults Global JS variable that comes from php
@Component({
	selector   : 'AMsingleComment',
	templateUrl: componentPath + 'views/single_comment.html' + fileVersion
})

export class SingleCommentComponent {
	commentsAll = [
		{
			id    : 2,
			author: 'John Doe',
			body  : 'Large text body'
		},
		{
			id    : 3,
			author: 'Sharah Connor',
			body  : 'Large text body'
		}
	];
}
