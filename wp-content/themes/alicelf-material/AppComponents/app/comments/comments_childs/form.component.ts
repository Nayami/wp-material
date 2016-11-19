import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CommentInterface } from '../mocks/CommentInterface';
import { CommentService } from '../services/comment.service';
import { PostService } from "../services/post.service";
import {UserGlobalService} from "../../shared/services/user.global.service";
import {AuthGlobalService} from "../../shared/services/auth.service";
import { Observable, Subscription } from 'rxjs/Rx';

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/comments/';

@Component( {
	selector   : 'AMformComponent',
	templateUrl: componentPath + 'views/form.html',
} )

export class FormComponent implements OnInit, OnDestroy {


	userId: number = AMdefaults.currentUser;
	addReviewSubscription : Subscription;
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
		private user : UserGlobalService,
		private postService: PostService,
		private auth : AuthGlobalService,
		private commentService : CommentService ) {

		this.commentForm = fb.group( {
			"name"   : [ "", Validators.required ],
			"email"  : [ "", Validators.required ],
			"website": [ "" ],
			"body"   : [ "", Validators.required ]
		} );

		user.getUser()
			.subscribe(response => {
				this.auth.loaded = true;
				this.auth.authorized = response.ID ? true : false;
				let fDefaults = {
					"name"   : response.ID ? response.user_nicename : "",
					"email"  : response.ID ? response.user_email : "",
					"website": response.ID ? response.user_url : "",
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
			this.addReviewSubscription = this.commentService.insertComment( commentData )
			    .subscribe( response => {
				    this.commentService.addComment( response );
				    (<FormControl>this.commentForm.controls['body']).setValue(null, {});
			    } );
		} else {
			// @TODO: handle errors
		}
	}

	ngOnDestroy(): void {
		this.addReviewSubscription.unsubscribe();
	}

}