import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

declare var AMdefaults: any;

@Injectable()
export class PostService {

	postId: number;
	post : any;

	constructor( private http: Http ) {
	}

	getPost(postId): Observable<any> {
		let id = postId || this.postId;
		return this.http.get( AMdefaults.baseurl + "/wp-json/wp/v2/posts/" + id )
		           ['map']( res => res.json() );

	}

}