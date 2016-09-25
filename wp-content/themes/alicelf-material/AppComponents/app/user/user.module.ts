import { NgModule } from '@angular/core';
import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { userRoutingProviders } from "./user.routing";

@NgModule( {
	providers: [
		AuthService,
		UserService,
		userRoutingProviders
	],
} )
export class UserModule {
}