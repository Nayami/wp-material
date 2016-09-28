import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, Subscription } from  'rxjs/Rx';
declare var AMdefaults: any;

@Injectable()
export class AppSettingsService implements OnDestroy {

	public settings: any;
	public loaded: boolean = false;
	private settingsSubscription: Subscription;

	constructor( private http: Http ) {
	}

	getSettings(): Observable<any> {
		let queryUrl = AMdefaults.ajaxurl + "?action=ajx20162128122131";
		return this.http.get( queryUrl )
		           .map( ( response: Response ) => response.json() );
	}

	setSettings() {
		this.settingsSubscription = this.getSettings()
		                                .subscribe( data => {
			                                this.settings = data;
			                                this.loaded = true;
		                                } )
	}

	ngOnDestroy(): void {
		this.settingsSubscription.unsubscribe();
	}

}