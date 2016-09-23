import { Component, OnInit, ElementRef } from '@angular/core';

@Component( {
	selector: 'user-profile-component',
	template : `<router-outlet></router-outlet>`
} )
export class UserComponent implements OnInit {

	constructor( private  elm: ElementRef ) {}

	ngOnInit() {

	}
}