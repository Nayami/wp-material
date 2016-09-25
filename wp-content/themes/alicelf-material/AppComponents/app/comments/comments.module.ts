import { NgModule } from '@angular/core';
import { UserService } from "./services/user.service";
import { PostService } from "./services/post.service";
import { CommentService } from "./services/comment.service";

@NgModule( {
	providers: [
		UserService,
		PostService,
		CommentService
	],
} )
export class CommentsModule {
}