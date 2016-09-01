import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { CommentsComponent }  from './comments.component';
import { FormComponent }  from './comments_childs/form.component';
import { ListingCommentComponent }  from './comments_childs/listing.comments.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	declarations: [
		CommentsComponent,
		FormComponent,
		ListingCommentComponent
	],
	bootstrap: [ CommentsComponent ]
})

export class CommentsModule { }