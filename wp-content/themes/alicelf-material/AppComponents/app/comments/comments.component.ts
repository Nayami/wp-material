import { Component, OnDestroy, ElementRef,
	trigger, state, style, transition, animate } from '@angular/core';

import { CommentService } from './services/comment.service';
import { PostService } from "./services/post.service";
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/comments/';

@Component( {
	selector   : 'AMreviewShell',
	templateUrl: componentPath + 'views/shell.html',
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

export class CommentsComponent implements OnDestroy {

	title = 'Leave a Reply';
	getCommentsSubscription: Subscription;
	postSubscription: Subscription;

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
		this.postSubscription =
			postService.getPost( this.postService.postId )
			           .subscribe(response => {
				           postService.post = response;
			           })

	}

	ngOnDestroy(): void {
		this.getCommentsSubscription.unsubscribe();
		this.postSubscription.unsubscribe();
	}

}