import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

declare var AMdefaults: any;

@Injectable()
export class PostService {

	postId: number;

	constructor( private http: Http ) {}

	setPostId( id: number ): void {
		this.postId = id;
	}

	getPostId(): number {
		return this.postId;
	}

	getPost() {
		let params = new URLSearchParams();
		params.set('action', 'ajx20163414083403');
		return this.http.get( AMdefaults.ajaxurl, { search: params } )
		           .map(res => res.json())

	}


}