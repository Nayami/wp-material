import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

declare var AMdefaults: any;

@Injectable()
export class PostService {

	postId: number;

	constructor( private http: Http ) {
	}

	getPost(): Observable<any> {
		let params = new URLSearchParams();
		return this.http.get( AMdefaults.baseurl + "/wp-json/posts/" + this.postId )
		           .map( res => res.json() )

	}

}