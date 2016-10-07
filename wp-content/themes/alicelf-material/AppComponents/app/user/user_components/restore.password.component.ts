import { Component, OnDestroy,
	trigger, state, style, transition, animate } from '@angular/core';

import { Http, Headers, Response } from "@angular/http";
import { Router } from "@angular/router";
import { Subscription, Observable } from 'rxjs/Rx';

import { UserGlobalService } from "../../shared/services/user.global.service";
import { AuthGlobalService } from "../../shared/services/auth.service";
import {FlashNoticeService} from "../../shared/services/alert.dialog.modal/flash.notices";
import {LayoutDataService} from "../../shared/services/layout.data.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/user/views/';

@Component( {
	templateUrl: componentPath + 'restore.password.html',
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
export class RestorePasswordComponent implements OnDestroy {

	checkdata: any = {
		data  : null,
		loaded: false
	};
	private tokenSubscription: Subscription;
	private newpassword: string = null;
	progress: boolean = false;

	constructor( private http: Http,
	             private router: Router,
	             private layoutData : LayoutDataService,
	             private flashes: FlashNoticeService,
	             private auth: AuthGlobalService,
	             private userService: UserGlobalService ) {
		this.progress = true;
		this.tokenSubscription = router
			.routerState.queryParams // token, email
			.subscribe( ( data: any ) => {
				this.checkInfo( data )
				    .subscribe( response => {
					    if ( response ) {
						    this.checkdata.data = response.reset_confirm_data;
						    if ( response.next_step === 'authentificate' ) {
							    this.userService.currentUser = response.user;
							    this.auth.loaded = true;
							    this.auth.authorized = true;
							    this.flashes.attachNotifications( {
								    message : 'Success, you are logged in!',
								    cssClass: 'mdl-color--green-200 mdl-color-text--green-900',
								    type    : 'dismissable',
							    } );
							    if ( response.message ) {
								    this.flashes.attachNotifications( {
									    message : response.message,
									    cssClass: 'mdl-color--blue-200 mdl-color-text--blue-900',
									    type    : 'dismissable',
								    } );
							    }
							    this.router.navigate( ['/'] );
							    this.layoutData.invokeLoad();
						    }

					    }
					    this.checkdata.loaded = true;
				    } );
				this.progress = false;
			} );
	}

	checkInfo( data ): Observable<any> {
		let headers = new Headers( { "Content-Type": "application/x-www-form-urlencoded" } );
		const body = "action=ajx20161128111129&body_data=" + JSON.stringify( data );
		return this.http.post( AMdefaults.ajaxurl, body, { headers: headers } )
		           .map( ( response: Response ) => response.json() );
	}

	setNewPass() {
		if ( this.newpassword ) {
			if ( this.newpassword.length > 5 ) {
				this.checkdata.data['newpass'] = this.newpassword;
				this.setNewPassRequest()
				    .subscribe( data => {
					    if ( data.status === 'success' ) {
						    this.auth.loaded = true;
						    this.auth.authorized = data.user.ID ? true : false;
						    this.userService.currentUser = data.user;
						    if ( !this.auth.authorized ) {
							    this.router.navigate( ['/screen/auth'] )
						    } else {
							    this.router.navigate( ['/'] );
							    this.flashes.attachNotifications( {
								    message : 'Success, you are logged in!',
								    cssClass: 'mdl-color--green-200 mdl-color-text--green-900',
								    type    : 'dismissable',
							    } );
						    }
					    } else {
						    this.flashes.attachNotifications( {
							    message : 'Something wrong!',
							    cssClass: 'mdl-color--blue-grey-300 mdl-color-text--blue-grey-900',
							    type    : 'dismissable',
						    } );
					    }
					    this.layoutData.invokeLoad();
				    } )
			} else {
				this.flashes.attachNotifications( {
					message : 'Password to short',
					cssClass: 'mdl-color--blue-200 mdl-color-text--blue-900',
					type    : 'dismissable',
				} );
			}
		} else {
			this.flashes.attachNotifications( {
				message : 'Password cannot be blank',
				cssClass: 'mdl-color--orange-100 mdl-color-text--orange-900',
				type    : 'dismissable',
			} );
		}
	}

	setNewPassRequest() {
		let headers = new Headers( { "Content-Type": "application/x-www-form-urlencoded" } );
		const body = "action=ajx20160928110922&body_data=" + JSON.stringify( this.checkdata.data );
		return this.http.post( AMdefaults.ajaxurl, body, { headers: headers } )
		           .map( ( response: Response ) => response.json() );
	}

	ngOnDestroy() {
		this.tokenSubscription.unsubscribe();
	}
}