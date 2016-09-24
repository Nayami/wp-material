import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Rx';
import {AuthService} from "../services/auth.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/user/views/';

@Component( {
	templateUrl: componentPath + 'profile.html'
} )

export class ProfileComponent implements OnDestroy {

	private userSubscription : Subscription;

	constructor( private router: Router,
	             private auth : AuthService,
	             private userService: UserService ) {
		if ( !auth.loaded ) {
			this.userSubscription = userService.getCurrentUser()
			           .subscribe( user => {
				           auth.loaded = true;
				           auth.authorized = user.ID ? true : false;
				           userService.currentUser = user;

				           if ( !auth.authorized )
					           router.navigate( ['screen/auth'] )
			           } );
		}
	}

	ngOnDestroy() {
		this.userSubscription.unsubscribe();
	}


}