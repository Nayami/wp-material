import { NgModule } from '@angular/core';
import { PostService } from "./services/post.service";
import { CommentService } from "./services/comment.service";

@NgModule( {
	providers: [
		PostService,
		CommentService
	],
} )
export class CommentsModule {
}