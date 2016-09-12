import {CommentInterface} from "./CommentInterface";
declare var AMdefaults: any;

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


var fileVersion   = '?tmplv=' + Date.now(),
    componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

@Injectable()
export class CommentsDataService {

	constructor (private http: Http) { }

	getComments() {
		return this.http.get(componentPath+'/model/comments.json'+fileVersion)
			.map(response => <CommentInterface[]>response.json().data);
	}

}