import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/user/views/';

@Component( {
	templateUrl: componentPath + 'profile.html'
} )

export class ProfileComponent implements OnInit {

	constructor( private router: Router, private userService: UserService ) {
		if ( ! userService.currentUser.loaded ) {
			userService.getCurrentUser()
			           .subscribe( user => {
				           user.loaded = true;
				           userService.currentUser = user;

				           if ( !userService.currentUser.ID )
					           router.navigate( ['screen/auth'] )
			           } );
		}
	}

	ngOnInit() {
	}


}