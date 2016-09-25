import { Component, OnInit, ElementRef } from '@angular/core';

import { CommentService } from './services/comment.service';
import { PostService } from "./services/post.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/comments/';

@Component( {
	selector   : 'AMreviewShell',
	templateUrl: componentPath + 'views/shell.html'
} )

export class CommentsComponent implements OnInit {
	title = 'Leave a Reply';

	shelllaunchConfirm : any;

	constructor( elm: ElementRef, private postService: PostService ) {
		this.postService.setPostId( parseInt( elm.nativeElement.getAttribute( 'datapostid' ) ) );
	}

	ngOnInit() {}


	handlelaunchConfirm(arr) {
		this.shelllaunchConfirm = arr;
	}
}