import { Component, OnInit} from '@angular/core';
import {CommentService} from "../services/comment.service";

@Component( {
	selector: 'edit-comment',
	template: `
		edit echo
	`
} )
export class EdittCommentComponent implements OnInit {
	
	constructor(private CommentsObj: CommentService ) {}

	ngOnInit() {

	}
}