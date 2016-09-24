import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {AuthService} from "./auth.service";

declare var AMdefaults: any;

@Injectable()

export class UserService {

	currentUser: any;

	constructor( private http: Http, private auth: AuthService ) {}

	getCurrentUser(): Observable<any> {
		let queryUrl = AMdefaults.ajaxurl + "?action=ajx20163917023918";
		return this.http.get( queryUrl )
		           .map( response => response.json() );
	}


	static requestToString( object, action ) {
		let str = "action=" + action + "&";
		for ( var obj in object ) {
			let value = typeof object[obj] === 'object' ? JSON.stringify( object[obj] ) : object[obj];
			str += obj + "=" + value + "&";
		}
		return str.substring( 0, str.length - 1 );
	}

}