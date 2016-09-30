import { Injectable, OnDestroy } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

import { UserInterface } from '../mocks/user.interface';
import {AuthGlobalService} from "./auth.service";
import {AppSettingsService} from "./app.settings.service";
import {FlashNoticeService} from "./alert.dialog.modal/flash.notices";
declare var AMdefaults: any;

@Injectable()
export class UserGlobalService implements OnDestroy {

	public theUser: UserInterface;
	public currentUser: UserInterface;
	public allUsers: UserInterface[] = [];
	private userSubscription: Subscription;

	constructor( private http: Http,
	             private auth: AuthGlobalService,
	             private flashes: FlashNoticeService,
	             private appSettings: AppSettingsService ) {
	}

	getCurrentUser(): Observable<any> {
		let queryUrl = AMdefaults.ajaxurl + "?action=ajx20163917023918";
		return this.http.get( queryUrl )
		           .map( ( response: Response ) => response.json() );
	}

	setCurrentUser() {
		this.userSubscription = this.getCurrentUser()
		                            .subscribe( data => {
			                            this.currentUser = data;
			                            this.auth.loaded = true;
			                            this.auth.authorized = data.ID ? true : false;
		                            } );
	}


	checkAccessAndEmailConfirmation( user: any, auth: any ) {
		return this.http.get( AMdefaults.ajaxurl + '?action=ajx20162128122131' )
		           .map( ( response: Response ) => response.json() )
		           .subscribe( data => {
			           let strategy = data.auth_info.registration_strategy;

			           if ( auth.authorized && user.network_meta.email_confirmed !== 'confirmed' ) {
				           if ( strategy !== 'no_confirm' ) {
					           this.flashes.attachNotifications( {
						           message : 'Your email not confirmed yet!',
						           cssClass: 'mdl-color--blue-grey-700 mdl-color-text--blue-grey-100',
						           type    : 'dismissable',
						           html    : '<a href="'+AMdefaults.networkEndpoint+'?am_confirm_email=confirm">Confirm Now!</a>'
					           } );
				           }
			           }

		           } )
	}

	ngOnDestroy(): void {
		this.userSubscription.unsubscribe();
	}

}