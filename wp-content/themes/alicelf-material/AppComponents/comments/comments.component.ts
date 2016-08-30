import { Component } from '@angular/core';
var fileVersion = '?tmplv=' + Date.now();

@Component({
	selector   : 'AMcomment',
	templateUrl: AMdefaults.themeurl+'/AppComponents/comments/views/form.html' + fileVersion,
})

export class CommentsComponent {
	title = 'Leave a Reply';
}