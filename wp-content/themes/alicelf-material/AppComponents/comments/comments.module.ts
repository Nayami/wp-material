import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { CommentsComponent }  from './comments.component';
import { SingleCommentComponent }  from './comments_childs/single.comments.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	declarations: [
		CommentsComponent,
		SingleCommentComponent
	],
	bootstrap: [ CommentsComponent ]
})

export class CommentsModule { }