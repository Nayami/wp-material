import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_PROVIDERS } from '@angular/http';

import { CommentsComponent }  from './comments.component';
import { FormComponent }  from './comments_childs/Form.component';
import { ListingCommentsComponent }  from './comments_childs/ListingComments.component';
import { CommentsDataService } from "./model/CommentsDataService";


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
	bootstrap   : [CommentsComponent],
	providers : [ CommentsDataService, HTTP_PROVIDERS ]
} )

export class CommentsModule {
}