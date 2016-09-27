import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGlobalService } from './services/user.global.service';
import { FlashNoticeService } from "./services/alert.dialog.modal/flash.notices";
import {AuthGlobalService} from "./services/auth.service";

@NgModule( {} )

export class SharedModule {
	static forRoot() {
		return {
			ngModule : SharedModule,
			providers: [
				AuthGlobalService,
				UserGlobalService,
				FlashNoticeService
			]
		}
	}
}

export {
	AuthGlobalService,
	UserGlobalService,
	FlashNoticeService
}