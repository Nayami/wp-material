import { Component, OnDestroy, ElementRef } from '@angular/core';

import { CommentService } from './services/comment.service';
import { PostService } from "./services/post.service";
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/comments/';

@Component( {
	selector   : 'AMreviewShell',
	templateUrl: componentPath + 'views/shell.html'
} )

export class CommentsComponent implements OnDestroy {

	title = 'Leave a Reply';
	getCommentsSubscription: Subscription;

	constructor( elm: ElementRef,
	             private postService: PostService,
	             private commentsService: CommentService ) {
		this.postService.postId = parseInt( elm.nativeElement.getAttribute( 'datapostid' ) );
		this.getCommentsSubscription =
			commentsService.getComments( this.postService.postId )
			               .subscribe( response => {
				               if ( response.length > 0 ) {
					               commentsService.commentsAll = response;
				               }
			               } );

	}

	ngOnDestroy(): void {
		this.getCommentsSubscription.unsubscribe()
	}

}