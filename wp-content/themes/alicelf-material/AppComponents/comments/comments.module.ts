import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_PROVIDERS } from '@angular/http';

import { CommentsComponent }  from './comments.component';
import { FormComponent }  from './comments_childs/Form.component';
import { ListingCommentsComponent }  from './comments_childs/ListingComments.component';
import { PostService } from "./services/post.service";
import { CommentService } from "./services/comment.service";
import { ConfirmComponent } from "./comments_childs/confirm.component";


@NgModule( {
	imports     : [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		CommentsComponent,
		FormComponent,
		ListingCommentsComponent,
		ConfirmComponent
	],
	bootstrap   : [ CommentsComponent ],
	providers : [ CommentService, PostService, HTTP_PROVIDERS ]
} )

export class CommentsModule {
}