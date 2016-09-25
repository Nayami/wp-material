import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { DumyService }         from './services/dummy.service';

@NgModule( {} )

export class SharedModule {
	static forRoot() {
		return {
			ngModule    : SharedModule,
			providers   : [ DumyService ]
		}
	}
}

export {
	DumyService
}