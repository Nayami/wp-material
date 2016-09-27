import { NgModule } from '@angular/core';
import { userRoutingProviders } from "./user.routing";
import { UserGlobalService } from "../shared/services/user.global.service";
import { AuthGlobalService } from "../shared/services/auth.service";

@NgModule( {
	providers: [
		AuthGlobalService,
		UserGlobalService,
		userRoutingProviders
	],
} )
export class UserModule {

}