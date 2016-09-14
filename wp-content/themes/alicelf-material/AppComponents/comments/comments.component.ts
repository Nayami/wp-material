import { Component, Input, OnInit, ElementRef } from '@angular/core';

import { CommentsDataService } from './model/CommentsDataService';
import { PostService } from "./services/post.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

@Component( {
	selector   : 'AMreviewShell',
	templateUrl: componentPath + 'views/shell.html'
} )

export class CommentsComponent implements OnInit {
	title = 'Leave a Reply';

	postService: any;

	constructor( elm: ElementRef, postService: PostService ) {
		this.postService = postService;
		this.postService.setPostId( parseInt( elm.nativeElement.getAttribute( 'datapostid' ) ) );
	}

	ngOnInit() {}
}