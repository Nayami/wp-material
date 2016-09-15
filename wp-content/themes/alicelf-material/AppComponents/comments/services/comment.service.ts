import {CommentInterface} from "../mocks/CommentInterface";
declare var AMdefaults: any;

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PostService } from "../services/post.service";

var componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

@Injectable()
export class CommentService {


	constructor( private http: Http, private postService: PostService ) {

	}

	getComments() {
		return this.http.get( componentPath + '/mocks/comments.json' )
		           .map( response => <CommentInterface[]>response.json().data );
	}

}