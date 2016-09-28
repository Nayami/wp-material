import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from  'rxjs/Rx';

declare var AMdefaults: any;

@Injectable()
export class AuthGlobalService {

	authorized: boolean = false;
	loaded: boolean = false;

	constructor( private http: Http ) {
	}

	/**
	 * ==================== AUTHORIZATION ======================
	 * 24.09.2016
	 */
	authorizeMe( data: any ): Observable<any> {
		let headers = new Headers({"Content-Type":"application/x-www-form-urlencoded"});
		const body = "action=ajx20162924062955&body_data="+ JSON.stringify( data );

		return this.http.post( AMdefaults.ajaxurl, body, {headers:headers} )
		           .map( response => response.json() );
	}


}