import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

import { CommentsComponent }  from './comments.component';
import { FormComponent }  from './comments_childs/Form.component';
import { ListingCommentsComponent }  from './comments_childs/ListingComments.component';


@NgModule( {
	imports     : [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		CommentsComponent,
		FormComponent,
		ListingCommentsComponent
	],
	bootstrap   : [CommentsComponent]
} )

export class CommentsModule {
}