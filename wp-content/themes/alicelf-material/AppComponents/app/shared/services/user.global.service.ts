import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { UserInterface } from '../mocks/user.interface'

@Injectable()
export class UserGlobalService {

	private theUser: UserInterface;
	private currentUser: UserInterface;
	private allUsers: UserInterface[] = [];

	constructor( private http: Http ) {
	}

}