import { Injectable, OnDestroy } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

import { UserInterface } from '../mocks/user.interface';
import {AuthGlobalService} from "./auth.service";
import {FlashNoticeService} from "./alert.dialog.modal/flash.notices";
declare var AMdefaults: any;

@Injectable()
export class UserGlobalService implements OnDestroy {

	public currentUser: UserInterface;
	public allUsers: UserInterface[] = [];
	private userSubscription: Subscription;
	private mediaSubscription: Subscription;
	public userMedia : any = [];

	constructor( private http: Http,
	             private auth: AuthGlobalService,
	             private flashes: FlashNoticeService ) {
	}


	/**
	 * ==================== If not slug will be current user ======================
	 * 06.10.2016
	 */
	getUser(slug = null): Observable<any> {
		let queryUrl = AMdefaults.ajaxurl + "?action=ajx20163917023918";
		if(slug) queryUrl += "&by_slug="+slug;
		return this.http.get( queryUrl )
		           ['map']( ( response: Response ) => response.json() );
	}

	checkAccessAndEmailConfirmation( user: any, auth: any ) {
		let htmlButton = '<a class="mdl-color-text--blue-grey-900" href="' + AMdefaults.networkEndpoint + '?am_confirm_email=confirm">Confirm Now!</a>';
		return this.http.get( AMdefaults.ajaxurl + '?action=ajx20162128122131' )
		           ['map']( ( response: Response ) => response.json() )
		           .subscribe( data => {
			           let strategy = data.auth_info.registration_strategy;

			           if ( auth.authorized && user.network_meta.email_confirmed !== 'confirmed' ) {
				           if ( strategy !== 'no_confirm' ) {
					           this.flashes.attachNotifications( {
						           message : 'Your email not confirmed yet!',
						           cssClass: 'mdl-color--blue-grey-300 mdl-color-text--blue-grey-900',
						           type    : 'dismissable',
						           html    : htmlButton
					           } );
				           }
			           }

		           } )
	}

	ngOnDestroy(): void {
		this.userSubscription.unsubscribe();
	}

	getUserMedia( userId: number ):Observable<any> {
		const body = AMdefaults.baseurl + "/wp-json/wp/v2/media?media_type=image&author=" + userId;
		return this.http.get( body )['map']( response => response.json() );
	}


	/**
	 * ==================== Logout ======================
	 * 01.10.2016
	 */
	doLogout(): Observable<any> {
		return this.http.get( AMdefaults.ajaxurl + '?action=ajx20160101040141' )
		           ['map']( ( response: Response ) => response.json() );
	}

}