import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { CommentsComponent }  from './comments.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	declarations: [
		CommentsComponent
	],
	bootstrap: [ CommentsComponent ]
})

export class CommentsModule { }