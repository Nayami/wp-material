import { Component } from '@angular/core';
var fileVersion = '?tmplv=' + Date.now(),
	componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

@Component({
	selector   : 'AMcomment',
	templateUrl: componentPath + 'views/form.html' + fileVersion
})

export class CommentsComponent {
	title = 'Leave a Reply';
}