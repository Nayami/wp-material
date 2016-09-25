import { Component, Output, Input,
	OnInit, EventEmitter,
	trigger, state, style, transition, animate
} from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { HTTP_PROVIDERS } from '@angular/http';
import { CommentService } from '../services/comment.service';
import { CommentInterface } from "../mocks/CommentInterface";
import { PostService } from "../services/post.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/comments/';

@Component( {
	selector   : 'listingComments',
	templateUrl: componentPath + 'views/listing_comments.html',
	animations : [
		trigger( 'flyInOut', [
			state( 'in', style( { transform: 'translateY(0)', opacity: 0 } ) ),

			transition( 'void => *', [
				style( { transform: 'translateY(-40%)', opacity: 1 } ),
				animate( '300ms ease-in' )
			] ),
			transition( '* => void', [
				animate( '300ms ease-out', style( { transform: 'translateX(100%)', opacity: 0 } ) )
			] )
		] )
	]
} )

export class ListingCommentsComponent {

	@Output() launchConfirm = new EventEmitter();
	userId: number = AMdefaults.currentUser;

	editForm: FormGroup;

	currentlyEdit: number;
	currentlyEditText: string;
	currentEditComment: any;

	constructor( private formBuild: FormBuilder,
	             private postService: PostService,
	             private CommentsObj: CommentService ) {
		this.editForm = formBuild.group( {} );
	}

	// @TODO: Create Reply action
	replyAction( comment, index ) {
		//console.log( comment, index );
	}

	/**
	 * ==================== UPDATE ACTION ======================
	 * 16.09.2016
	 */
	updateReview() {
		if ( this.editForm.status === "VALID" ) {
			this.currentEditComment.content = this.editForm.value.updatedValueReview;
			this.CommentsObj.updateComment( this.currentEditComment )
			    .subscribe( response => {
				    if ( response.status === 'success' ) {
					    this.cancelEdit();
				    }
			    } )
		}
	}

	// OPEN EDIT TEXTAREA
	editAction( comment ) {
		this.currentlyEdit = comment.ID;
		this.currentlyEditText = comment.content;
		this.currentEditComment = comment;

		this.editForm = this.formBuild.group( {
			"updatedValueReview": [
				this.currentlyEditText,
				Validators.required
			]
		} );
	}

	// CANCEL EDIT
	cancelEdit() {
		this.currentlyEdit = 0;
		this.currentlyEditText = null;
	}

	// DELETE COMMENT
	deleteAction( comment, index ) {
		this.launchConfirm.emit( {
			commentID: comment.ID,
			index    : index,
			launch   : true,
			confirmed: false
		} );
	}

}