import { Component } from '@angular/core';

declare var AMdefaults: any;
var fileVersion = '?tmplv=' + Date.now(),
	componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

@Component({
	selector   : 'AMreviewShell',
	templateUrl: componentPath + 'views/shell.html' + fileVersion
})

export class CommentsComponent {
	title = 'Leave a Reply';
}