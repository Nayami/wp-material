import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from "./user.component";
import { NotFoundComponent} from "./user_components/notfound.component";
import { ProfileComponent } from "./user_components/profile.component";

const appRoutes: Routes = [
	{ path: 'user', component: ProfileComponent },
	{ path: 'user/:user?/:param?', component: ProfileComponent },

	{ path: '**', component: NotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot( appRoutes );
