import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGlobalService } from './services/user.global.service';
import { FlashNoticeService } from "./services/alert.dialog.modal/flash.notices";
import {AuthGlobalService} from "./services/auth.service";
import {AppSettingsService} from "./services/app.settings.service";
import {LayoutDataService} from "./services/layout.data.service";
import {AMFormService} from "./services/AMFormService";
import {GlobConfirmService} from "./services/alert.dialog.modal/confirm.service";
import {ModalService} from "./services/alert.dialog.modal/modal.service";
import {CartService} from "./services/woocommerce/cart.service";

@NgModule( {} )

export class SharedModule {
	static forRoot() {
		return {
			ngModule : SharedModule,
			providers: [
				AppSettingsService,
				AuthGlobalService,
				UserGlobalService,
				FlashNoticeService,
				GlobConfirmService,
				AMFormService,
				ModalService,
				CartService,

				LayoutDataService
			]
		}
	}
}

export {
	AppSettingsService,
	AuthGlobalService,
	UserGlobalService,
	FlashNoticeService,
	AMFormService,
	LayoutDataService,
	ModalService,
	GlobConfirmService,
	CartService
}