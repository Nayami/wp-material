import {CommentInterface} from "./CommentInterface";
declare var AMdefaults: any;

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PostService } from "../services/post.service";

var componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

@Injectable()
export class CommentsDataService {

	postService : any;

	constructor( private http: Http, postService: PostService ) {
		this.postService = postService;
	}

	getComments() {
		return this.http.get( componentPath + '/model/comments.json' )
		           .map( response => <CommentInterface[]>response.json().data );
	}

}