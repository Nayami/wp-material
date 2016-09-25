import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { UserGlobalService }         from './services/user.global.service';

@NgModule( {} )

export class SharedModule {
	static forRoot() {
		return {
			ngModule    : SharedModule,
			providers   : [ UserGlobalService ]
		}
	}
}

export {
	UserGlobalService
}