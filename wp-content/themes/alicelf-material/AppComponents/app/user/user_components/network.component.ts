import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from "@angular/router";
import { UserGlobalService } from "../../shared/services/user.global.service";
import { AuthGlobalService } from "../../shared/services/auth.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/user/views/';

@Component( {
	templateUrl: componentPath + 'profile.html',
	animations : [
		trigger( 'renderAuthTrigger', [
			state( 'in', style( { transform: 'translateY(0)', opacity: 1 } ) ),

			transition( 'void => *', [
				style( { transform: 'translateY(20%)', opacity: 0 } ),
				animate( '300ms ease' )
			] ),
			transition( '* => void', [
				animate( '300ms ease-out', style( { transform: 'translateY(-20%)', opacity: 0 } ) )
			] )
		] )
	]
} )

export class NetworkComponent {

	constructor( private router: Router,
	             private auth: AuthGlobalService,
	             private userService: UserGlobalService ) {
		if ( !auth.loaded ) {
			userService.getCurrentUser()
			           .subscribe( user => {
				           auth.loaded = true;
				           auth.authorized = user.ID ? true : false;
				           userService.currentUser = user;

				           if ( !auth.authorized )
					           router.navigate( ['screen/auth'] )
			           } );
		} else {
			this.router.events.subscribe( event => {
				if ( event.constructor.name === 'NavigationEnd' ) {
					if ( event.url === '/' && !auth.authorized ) {
						router.navigate( ['screen/auth'] )
					}
				}
			} );
		}

	}

}