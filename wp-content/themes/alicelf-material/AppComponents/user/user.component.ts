import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { UserService } from './services/user.service';

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/user/';

@Component( {
	selector: 'user-profile-component',
	template : `<router-outlet></router-outlet>`
} )
export class UserComponent implements OnInit {

	constructor( private  elm: ElementRef, private  userService: UserService ) {
		//userService.someprop = elm.nativeElement.getAttribute( 'dataBasehrefprop' );
	}

	ngOnInit() {

	}
}