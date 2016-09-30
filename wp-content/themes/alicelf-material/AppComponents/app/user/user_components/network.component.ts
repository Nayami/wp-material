import { Component,
	OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from "@angular/router";
import { UserGlobalService } from "../../shared/services/user.global.service";
import { AuthGlobalService } from "../../shared/services/auth.service";
import { AppSettingsService } from "../../shared/services/app.settings.service";
import {FlashNoticeService} from "../../shared/services/alert.dialog.modal/flash.notices";

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


	constructor( private router: Router,
	             private appSettings: AppSettingsService,
	             private auth: AuthGlobalService,
	             private flashes: FlashNoticeService,
	             private userService: UserGlobalService ) {
		if(!appSettings.loaded)
			appSettings.setSettings();

		if ( !auth.loaded ) {
			this.loadAuthInfo();
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

	loadAuthInfo() {
		return this.userService.getCurrentUser()
		           .subscribe( user => {
			           this.auth.loaded = true;
			           this.auth.authorized = user.ID ? true : false;
			           this.userService.currentUser = user;
			           this.userService.checkAccessAndEmailConfirmation(user, this.auth);
			           if ( !this.auth.authorized ) {
				           this.router.navigate( ['screen/auth'] )
			           }
		           } );
	}



}