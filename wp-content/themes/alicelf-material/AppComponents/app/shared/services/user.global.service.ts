import { Injectable, OnDestroy } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

import { UserInterface } from '../mocks/user.interface';
import {AuthGlobalService} from "./auth.service";
declare var AMdefaults: any;

@Injectable()
export class UserGlobalService implements OnDestroy {

	public theUser: UserInterface;
	public currentUser: UserInterface;
	public allUsers: UserInterface[] = [];
	private userSubscription: Subscription;

	constructor( private http: Http, private auth: AuthGlobalService ) {
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

	ngOnDestroy(): void {
		this.userSubscription.unsubscribe();
	}

}