import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CommentInterface } from '../mocks/CommentInterface';
import { CommentService } from '../services/comment.service';
import { PostService } from "../services/post.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

@Component( {
	selector   : 'AMformComponent',
	templateUrl: componentPath + 'views/form.html',
} )

export class FormComponent implements OnInit {

	commentForm: FormGroup;

	constructor( fb: FormBuilder, private postService: PostService, private commentService : CommentService ) {

		this.commentForm = fb.group( {
			"name"   : [ "", Validators.required ],
			"email"  : [ "", Validators.required ],
			"website": [ "" ],
			"body"   : [ "", Validators.required ],
		} );
	}

	addReview(): void {
		if(this.commentForm.status === 'VALID') {
			let commentData = this.commentForm.value;
			commentData['postId'] = this.postService.postId;
			this.commentService.insertComment(commentData)
				.subscribe(response => {
					this.commentService.addComment(response);
				})
		}
	}


	ngOnInit() {
		this.postService.getPost()
		    .subscribe( data => {
			    //console.log( data );
		    } );
	}

}