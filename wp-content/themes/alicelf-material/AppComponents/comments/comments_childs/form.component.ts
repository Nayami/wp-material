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
	postService: any;

	constructor( fb: FormBuilder, postService: PostService ) {

		this.postService = postService;

		this.commentForm = fb.group( {
			"name"   : [ "", Validators.required ],
			"email"  : [ "", Validators.required ],
			"website": [ "" ],
			"body"   : [ "", Validators.required ],
		} );
	}

	addReview(): void {
		console.log( this.commentForm.value );
	}


	ngOnInit() {
		this.postService.getPost()
		    .subscribe( data => {
			    console.log( data );
		    } );
	}

}