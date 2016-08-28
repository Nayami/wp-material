import { Component } from '@angular/core';

@Component({
	selector: 'AMsubline',
	template: `<h4>{{title}}</h4>`
})

export class SublineComponent {
	title = 'subline component';
}