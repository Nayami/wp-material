import { Component } from '@angular/core';

@Component({
	selector: 'AMcomment',
	template: `<h3>{{title}}</h3>`
})

export class CommentsComponent {
	title = 'Leave a Reply';
}