import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGlobalService } from './services/user.global.service';
import { FlashNoticeService } from "./services/alert.dialog.modal/flash.notices";

@NgModule( {} )

export class SharedModule {
	static forRoot() {
		return {
			ngModule : SharedModule,
			providers: [
				UserGlobalService,
				FlashNoticeService
			]
		}
	}
}

export {
	UserGlobalService,
	FlashNoticeService
}