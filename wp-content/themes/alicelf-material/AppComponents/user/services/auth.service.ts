import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

	authorized : boolean = false;
	loaded : boolean = false;

	constructor() {
	}
}