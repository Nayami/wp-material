import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from "./user.component";
import { NotFoundComponent } from "./user_components/notfound.component";
import { NetworkComponent } from "./user_components/network.component";
import { AMAuthComponent } from "./user_components/auth.component";
import { RestorePasswordComponent } from "./user_components/restore.password.component";

const appRoutes: Routes = [
	{ path: '', component: NetworkComponent },
	{ path: ':userslug', component: NetworkComponent },
	{ path: 'screen/auth', component: AMAuthComponent },
	{ path: 'screen/restorepass', component: RestorePasswordComponent },
	{ path: 'screen/restorepass/:tokenparams', component: RestorePasswordComponent },

	{ path: '**', component: NotFoundComponent }
];

export const userRoutingProviders: any[] = [];
export const userRouting: ModuleWithProviders = RouterModule.forRoot( appRoutes );