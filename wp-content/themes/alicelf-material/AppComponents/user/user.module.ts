import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from "./services/user.service";
import { UserComponent } from './user.component';
import { routing, appRoutingProviders } from './user.routing';
import { NotFoundComponent } from "./user_components/notfound.component";
import { NetworkComponent } from "./user_components/network.component";
import { AMAuthComponent } from "./user_components/auth.component";
import { AuthService } from "./services/auth.service";

@NgModule( {
	imports     : [
		BrowserModule,
		HttpModule,
		ReactiveFormsModule,
		FormsModule,
		routing,
	],
	declarations: [
		UserComponent,
		NotFoundComponent,
		NetworkComponent,
		AMAuthComponent
	],
	bootstrap   : [UserComponent],
	providers   : [
		AuthService,
		UserService,
		appRoutingProviders
	],
} )
export class UserModule {
}