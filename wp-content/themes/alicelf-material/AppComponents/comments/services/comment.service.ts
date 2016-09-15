import { CommentInterface } from "../mocks/CommentInterface";
declare var AMdefaults: any;

import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { PostService } from "../services/post.service";

var componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

@Injectable()
export class CommentService {

	commentsAll: any;

	addComment(data) {
		this.commentsAll.unshift(data);
	}

	constructor( private http: Http, private postService: PostService ) {
		this.getComments()
			.subscribe(response => this.commentsAll = response)
	}

	getComments(): Observable<any> {
		let queryUrl = AMdefaults.baseurl + "/wp-json/posts/" + this.postService.postId + "/comments";
		return this.http.get( queryUrl )
		           .map( response => response.json() );
	}


	insertComment( data ): Observable<any> {
		let headers = new Headers();
		const query = requestToString( data, "ajx20163414083403" );
		headers.append( 'Content-Type', 'application/x-www-form-urlencoded' );
		return this.http.post( AMdefaults.ajaxurl, query, {
			           headers: headers
		           } )
		           .map( response => response.json() );
	}

}

function requestToString( object, action ) {
	let str = "action=" + action + "&";
	for ( var obj in object ) {
		let value = object[obj];
		str += obj + "=" + value + "&";
	}
	return str.substring( 0, str.length - 1 );
}