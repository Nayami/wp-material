import { Component, OnDestroy,
	trigger, state, style, transition, animate } from '@angular/core';

import { Http, Headers, Response } from "@angular/http";
import { Router } from "@angular/router";
import { Subscription, Observable } from 'rxjs/Rx';

import { UserGlobalService } from "../../shared/services/user.global.service";
import { AuthGlobalService } from "../../shared/services/auth.service";
import {FlashNoticeService} from "../../shared/services/alert.dialog.modal/flash.notices";

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
	private newpassword : string = null;

	constructor( private http: Http,
	             private router: Router,
	             private flashes: FlashNoticeService,
	             private auth: AuthGlobalService,
	             private userService: UserGlobalService ) {
		this.tokenSubscription = router.routerState.queryParams // token, email
		                               .subscribe( ( data: any ) => {
			                               this.checkInfo( data )
			                                   .subscribe( response => {
				                                   if ( response ) {
					                                   this.checkdata.data = response;

					                                   // @TODO: check response.action === confirm
					                                   // @TODO: then depend on strategy

				                                   }
				                                   this.checkdata.loaded = true;
			                                   } )
		                               } );
	}


	checkInfo( data ): Observable<any> {
		let headers = new Headers( { "Content-Type": "application/x-www-form-urlencoded" } );
		const body = "action=ajx20161128111129&body_data=" + JSON.stringify( data );
		return this.http.post( AMdefaults.ajaxurl, body, { headers: headers } )
		           .map( ( response: Response ) => response.json() );
	}

	setNewPass(){
		if ( this.newpassword ) {
			if(this.newpassword.length > 5) {
				this.checkdata.data['newpass'] = this.newpassword;
				this.setNewPassRequest()
				    .subscribe(data => {
					    if(data.status === 'success') {
						    this.auth.loaded = true;
						    this.auth.authorized = data.user.ID ? true : false;
						    this.userService.currentUser = data.user;
						    if ( !this.auth.authorized ) {
							    this.router.navigate( ['screen/auth'] )
						    } else {
							    this.router.navigate( ['/'] );
							    this.flashes.attachNotifications( {
								    message : 'Success, you are logged in!',
								    cssClass: 'mdl-color--green-800 mdl-color-text--green-50',
								    type    : 'dismissable',
							    } );
						    }
					    } else {
						    this.flashes.attachNotifications( {
							    message : 'Something wrong!',
							    cssClass: 'mdl-color--red-900 mdl-color-text--red-50',
							    type    : 'dismissable',
						    } );
					    }
				    })
			} else {
				this.flashes.attachNotifications( {
					message : 'Password to short',
					cssClass: 'mdl-color--amber-900 mdl-color-text--amber-50',
					type    : 'dismissable',
				} );
			}
		} else {
			this.flashes.attachNotifications( {
				message : 'Password cannot be blank',
				cssClass: 'mdl-color--amber-900 mdl-color-text--amber-50',
				type    : 'dismissable',
			} );
		}
	}

	setNewPassRequest(){
		let headers = new Headers( { "Content-Type": "application/x-www-form-urlencoded" } );
		const body = "action=ajx20160928110922&body_data=" + JSON.stringify( this.checkdata.data );
		return this.http.post( AMdefaults.ajaxurl, body, { headers: headers } )
		           .map( ( response: Response ) => response.json() );
	}

	ngOnDestroy() {
		this.tokenSubscription.unsubscribe();
	}
}