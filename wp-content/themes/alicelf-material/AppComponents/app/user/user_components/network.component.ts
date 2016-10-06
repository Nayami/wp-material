import { Component,
	OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { UserGlobalService } from "../../shared/services/user.global.service";
import { AuthGlobalService } from "../../shared/services/auth.service";
import { LayoutDataService } from "../../shared/services/layout.data.service";
import {AppSettingsService} from "../../shared/services/app.settings.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/user/views/';

@Component( {
	templateUrl: componentPath + 'network_entrance.html',
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

	spinner: boolean = false;
	authAndBehaviour: any;

	constructor( private router: Router,
	             private layoutData: LayoutDataService,
	             private activatedRoute: ActivatedRoute,
	             private appSettings: AppSettingsService,
	             private auth: AuthGlobalService,
	             private userService: UserGlobalService ) {

		this.authAndBehaviour = appSettings.settings.themeSettings.auth_info;

		if ( !auth.loaded ) {
			this.loadAuthInfo();
		} else {
			this.router.events.subscribe( event => {

				if ( event.constructor['name'] === 'NavigationEnd' ) {
					if ( event.url === '/' ) {
						this.entranceBehaviour( this.authAndBehaviour.network_purpose );
					}
				}
			} );
		}
	}

	loadAuthInfo() {
		return this.userService.getUser()
		           .subscribe( user => {
			           this.auth.loaded = true;
			           this.auth.authorized = user.ID ? true : false;
			           this.userService.currentUser = user;
			           this.userService.checkAccessAndEmailConfirmation( user, this.auth );

			           // View another user profile
			           let maybeUserSlug = this.activatedRoute.snapshot.params['userslug'];
			           if ( !maybeUserSlug )
				           this.entranceBehaviour( this.authAndBehaviour.network_purpose );

			           this.layoutData.layoutDataLoaded = true;
		           } );
	}


	entranceBehaviour( networkPurpose ) {
		switch ( networkPurpose ) {
			case "user_profile" :
				if ( !this.auth.authorized )
					this.router.navigate( ['/screen/auth'] );
				break;
			case "users_listing" :
				console.log( "users_listing" );
				break;
			case "users_activity" :
				console.log( "users_activity" );
				break;
			default:
				this.router.navigate( ['/screen/auth'] );
		}
	}

}