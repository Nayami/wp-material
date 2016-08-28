import { Component } from '@angular/core';

@Component({
	selector: 'AMcomment',
	template: `<h1>{{title}}</h1>`
})

export class CommentsComponent {
	title = 'Outer comments Component';
}