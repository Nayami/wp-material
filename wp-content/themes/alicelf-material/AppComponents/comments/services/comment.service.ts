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

	addComment( data ) {
		this.commentsAll.unshift( data );
	}

	constructor( private http: Http, private postService: PostService ) {
		this.getComments()
		    .subscribe( response => this.commentsAll = response );
	}

	getComments(): Observable<any> {
		let queryUrl = AMdefaults.baseurl + "/wp-json/posts/" + this.postService.postId + "/comments";
		return this.http.get( queryUrl )
		           .map( response => response.json() );
	}


	/**
	 * ==================== UPDATE ======================
	 * 16.09.2016
	 */
	updateComment(data):Observable<any> {
		let headers = new Headers();
		const query = CommentService.requestToString( data, "ajx20161116071151" );
		headers.append( 'Content-Type', 'application/x-www-form-urlencoded' );
		return this.http.post( AMdefaults.ajaxurl, query, {
			           headers: headers
		           } )
		           .map( response => response.json() );
	}

	/**
	 * ==================== INSERT ======================
	 */
	insertComment( data ): Observable<any> {
		let headers = new Headers();
		const query = CommentService.requestToString( data, "ajx20163414083403" );
		headers.append( 'Content-Type', 'application/x-www-form-urlencoded' );
		return this.http.post( AMdefaults.ajaxurl, query, {
			           headers: headers
		           } )
		           .map( response => response.json() );
	}


	/**
	 * ==================== DELETE ======================
	 */
	delAction( comment ) {
		this.destroyComment( comment )
		    .subscribe( response => {
			    if ( response.status === 'success' ) {
				    this.commentsAll.splice( response.index, 1 );
			    }
		    } );
	}

	destroyComment( comment ): Observable<any> {
		const query = CommentService.requestToString( comment, "ajx20165916125929" );
		return this.http.delete( AMdefaults.ajaxurl + "?" + query )
		           .map( response => response.json() );
	}

	// Convert object to string
	static requestToString( object, action ) {
		let str = "action=" + action + "&";
		for ( var obj in object ) {
			let value = typeof object[obj] === 'object' ? JSON.stringify( object[obj] ) : object[obj];
			str += obj + "=" + value + "&";
		}
		return str.substring( 0, str.length - 1 );
	}

}