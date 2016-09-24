import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from "./user.component";
import { NotFoundComponent } from "./user_components/notfound.component";
import { NetworkComponent } from "./user_components/network.component";
import { AMAuthComponent } from "./user_components/auth.component";

const appRoutes: Routes = [
	{ path: '', component: NetworkComponent },
	{ path: ':param', component: NetworkComponent },
	{ path: 'screen/auth', component: AMAuthComponent },

	{ path: '**', component: NotFoundComponent }
];


export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot( appRoutes );
