import { Component,
	OnInit, EventEmitter, OnDestroy,
	trigger, state, style, transition, animate
} from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CommentService } from '../services/comment.service';
import { CommentInterface } from "../mocks/CommentInterface";
import { PostService } from "../services/post.service";
import {GlobConfirmService} from "../../shared/services/alert.dialog.modal/confirm.service";
import { Subscription } from 'rxjs/Rx';

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

export class ListingCommentsComponent implements OnDestroy, OnInit {

	userId: number = AMdefaults.currentUser;

	editForm: FormGroup;

	currentlyEdit: number;
	currentlyEditText: string;
	currentEditComment: any;

	delSubscription: Subscription;
	maybedestroy: any = {
		id   : null,
		index: null
	};

	constructor( private formBuild: FormBuilder,
	             private postService: PostService,
	             private confirmService: GlobConfirmService,
	             private CommentsObj: CommentService ) {
		this.editForm = formBuild.group( {} );
	}

	ngOnInit() {
		// Watch delete comment approove
		this.delSubscription =
			this.confirmService.confirmationChange
			    .subscribe( data => {
				    if ( data.id === this.confirmService.currentID ) {
					    if ( data.dialogAnswer ) {
						    this.CommentsObj.delAction(this.maybedestroy);
					    }
					    this.confirmService.unplugConfirmation();
				    }
			    } )
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

	// Ask Confirmaiton
	deleteAction( comment, index ) {
		this.maybedestroy.id = comment.ID;
		this.maybedestroy.index = index;
		let stamp = new Date().getTime();
		this.confirmService.currentID = stamp;
		this.confirmService.launchConfirm( {
			id           : stamp,
			dialogClass  : 'warning-alert',
			dialogMessage: 'Are you sure you wand delete this comment?',
			dialogAnswer : null,
			showButtons  : true
		} )
	}

	ngOnDestroy(): void {
		this.delSubscription.unsubscribe();
	}

}