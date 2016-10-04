import { Component,
	OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { UserGlobalService } from "../../shared/services/user.global.service";
import { AuthGlobalService } from "../../shared/services/auth.service";
import { FlashNoticeService } from "../../shared/services/alert.dialog.modal/flash.notices";
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

	private currentViewedUser: any;
	spinner : boolean = false;
	authAndBehaviour:any;

	constructor( private router: Router,
	             private layoutData : LayoutDataService,
	             private activatedRoute: ActivatedRoute,
	             private appSettings: AppSettingsService,
	             private auth: AuthGlobalService,
	             private flashes: FlashNoticeService,
	             private userService: UserGlobalService ) {

		this.authAndBehaviour = appSettings.settings.themeSettings.auth_info;

		if ( !auth.loaded ) {
			this.loadAuthInfo();
		} else {
			this.router.events.subscribe( event => {
				if ( event.constructor.name === 'NavigationEnd' ) {
					// @TODO: check network purpose
					if ( event.url === '/' && !auth.authorized ) {
						router.navigate( ['/screen/auth'] )
					}
				}
				// View another user profile
				let maybeUserSlug = this.activatedRoute.snapshot.params['userslug'];
				if ( maybeUserSlug ) {
					this.currentViewedUser = maybeUserSlug;
				}
			} );
		}
	}

	loadAuthInfo() {
		return this.userService.getCurrentUser()
		           .subscribe( user => {
			           this.auth.loaded = true;
			           this.auth.authorized = user.ID ? true : false;
			           this.userService.currentUser = user;
			           this.userService.checkAccessAndEmailConfirmation( user, this.auth );

			           // View another user profile
			           let maybeUserSlug = this.activatedRoute.snapshot.params['userslug'];
			           if ( maybeUserSlug ) {
				           this.currentViewedUser = maybeUserSlug;
			           } else {

				           switch ( this.authAndBehaviour.network_purpose ) {
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
			           this.layoutData.layoutDataLoaded = true;
		           } );
	}


	invokeLogout() {
		this.spinner = true;
		this.userService.doLogout()
		    .subscribe( data => {
			    if ( data === "logout_confirmed" ) {
				    this.userService.currentUser = null;
				    this.auth.authorized = false;
				    this.router.navigate( ['/screen/auth'] )
			    }
			    this.flashes.attachNotifications( {
				    message : 'You are logged out.',
				    cssClass: 'mdl-color--blue-200 mdl-color-text--blue-900',
				    type    : 'dismissable',
			    } );
			    this.spinner = false;
		    } )
	}

}