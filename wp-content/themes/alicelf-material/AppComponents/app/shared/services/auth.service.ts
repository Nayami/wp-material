import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from  'rxjs/Rx';
import { AMFormService } from "./AMFormService";
import { AppSettingsService } from  "./app.settings.service";

@Injectable()
export class AuthGlobalService {

	authorized: boolean = false;
	loaded: boolean = false;
	ajaxurl : string;

	constructor( private http: Http, appSettings : AppSettingsService ) {
		this.ajaxurl = appSettings.settings.ajaxurl;
	}

	/**
	 * ==================== AUTHORIZATION ======================
	 * 24.09.2016
	 */
	authorizeMe( data: any ): Observable<any> {
		const body = AMFormService.dataToPost( "ajx20162924062955", data );
		return this.http.post( this.ajaxurl, body )['map']( response => response.json() );
	}



}