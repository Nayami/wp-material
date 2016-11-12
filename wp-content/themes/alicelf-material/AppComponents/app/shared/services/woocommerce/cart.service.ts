import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';
import { AppSettingsService } from  "../app.settings.service";

@Injectable()
export class CartService {

	public products: any = [];
	cartEmpty: boolean = true;
	ajaxurl: string;

	constructor( private http: Http, appSettings: AppSettingsService ) {
		this.ajaxurl = appSettings.settings.ajaxurl;
	}

	GetProducts(): Observable<any> {
		let queryUrl = this.ajaxurl + "?action=ajx20161412071430";
		return this.http.get( queryUrl )
			['map']( ( response: Response ) => response.json() );
	}

}