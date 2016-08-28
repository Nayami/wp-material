import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { SublineComponent } from './app_childs/subline.component';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	declarations: [
		AppComponent,
		SublineComponent
	],
	bootstrap: [ AppComponent ]
})

export class AppModule { }