import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CommentInterface } from '../mocks/CommentInterface';
import { CommentService } from '../services/comment.service';
import { PostService } from "../services/post.service";
import { UserService } from "../services/user.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

@Component( {
	selector   : 'AMformComponent',
	templateUrl: componentPath + 'views/form.html',
} )

export class FormComponent implements OnInit {

	userId: number = AMdefaults.currentUser;

	commentForm: FormGroup;

	currentCommenter: any = {
		ID           : null,
		logged_in    : false,
		user_nicename: null,
		user_email   : null,
		user_url     : null
	};

	constructor(
		private fb: FormBuilder,
		private user : UserService,
		private postService: PostService,
		private commentService : CommentService ) {

		this.commentForm = fb.group( {
			"name"   : [ "", Validators.required ],
			"email"  : [ "", Validators.required ],
			"website": [ "" ],
			"body"   : [ "", Validators.required ]
		} );

		user.getCurrentUser()
			.subscribe(response => {
				let fDefaults = {
					"name"   : response.logged_in ? response.user_nicename : "",
					"email"  : response.logged_in ? response.user_email : "",
					"website": response.logged_in ? response.user_url : "",
				};
				 //this.commentForm.controls['name']
				(<FormControl>this.commentForm.controls['name']).setValue(fDefaults.name, {});
				(<FormControl>this.commentForm.controls['email']).setValue(fDefaults.email, {});
				(<FormControl>this.commentForm.controls['website']).setValue(fDefaults.website, {});

				this.currentCommenter = response;
			})

	}

	ngOnInit() {}

	addReview(): void {
		if ( this.commentForm.status === 'VALID' ) {
			let commentData = this.commentForm.value;
			commentData['postId'] = this.postService.postId;
			this.commentService.insertComment( commentData )
			    .subscribe( response => {
				    this.commentService.addComment( response );
				    (<FormControl>this.commentForm.controls['body']).setValue(null, {});
			    } );
		}
	}

}