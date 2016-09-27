import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { UserInterface } from '../mocks/user.interface';
declare var AMdefaults: any;

@Injectable()
export class UserGlobalService {

	public theUser: UserInterface;
	public currentUser: UserInterface;
	public allUsers: UserInterface[] = [];

	constructor( private http: Http ) {}

	getCurrentUser(): Observable<any> {
		let queryUrl = AMdefaults.ajaxurl + "?action=ajx20163917023918";
		return this.http.get( queryUrl )
		           .map( (response: Response ) => response.json() );
	}

}