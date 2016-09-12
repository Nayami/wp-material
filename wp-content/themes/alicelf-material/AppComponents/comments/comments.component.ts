import { Component } from '@angular/core';

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

@Component({
	selector   : 'AMreviewShell',
	templateUrl: componentPath + 'views/shell.html'
})

export class CommentsComponent {
	title = 'Leave a Reply';
}