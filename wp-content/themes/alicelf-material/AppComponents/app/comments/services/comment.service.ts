import { CommentInterface } from "../mocks/CommentInterface";
declare var AMdefaults: any;

import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { PostService } from "../services/post.service";
import {AMFormService} from "../../shared/services/AMFormService";
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class CommentService implements OnDestroy {

	commentsAll = [];
	delSubscription:Subscription;

	addComment( data ) {
		this.commentsAll.push( data );
	}

	constructor( private http: Http,
	             private postService: PostService ) {
	}

	/**
	 * ==================== GET COMMENTS ======================
	 */
	getComments(postId): Observable<any> {
		let queryUrl = AMdefaults.baseurl + "/wp-json/wp/v2/comments?order=asc&post="+postId;
		return this.http.get( queryUrl )
		           ['map']( response => response.json() );
	}


	/**
	 * ==================== UPDATE ======================
	 */
	updateComment(data):Observable<any> {
		const body = AMFormService.dataToPost( "ajx20161116071151", data );
		return this.http.post( AMdefaults.ajaxurl, body )['map']( response => response.json() );
	}

	/**
	 * ==================== INSERT ======================
	 */
	insertComment( data ): Observable<any> {
		const body = AMFormService.dataToPost( "ajx20163414083403", data );
		return this.http.post( AMdefaults.ajaxurl, body ) ['map']( response => response.json() );
	}

	/**
	 * ==================== DELETE ======================
	 */
	delAction( comment ) {
		this.delSubscription =
			this.destroyComment(comment ).subscribe(data =>{
				if(data.status === 'success') {
					this.commentsAll.splice( data.index, 1 );
				}
			});
	}

	destroyComment( data ): Observable<any> {
		let headers = new Headers({"Content-Type":"application/x-www-form-urlencoded"});
		const body = "action=ajx20165916125929&body_data="+ JSON.stringify( data );
		return this.http.post( AMdefaults.ajaxurl, body, {headers:headers} )
		           ['map']( response => response.json() );

	}

	ngOnDestroy(): void {
		this.delSubscription.unsubscribe();
	}

	// Convert object to string
	static requestToString( object, action : string = null ) {
		let str = action ? "action=" + action + "&" : '';
		for ( var obj in object ) {
			let value = typeof object[obj] === 'object' ?
				JSON.stringify( object[obj] )
				: object[obj];
			str += obj + "=" + value + "&";
		}
		return str.substring( 0, str.length - 1 );
	}

}