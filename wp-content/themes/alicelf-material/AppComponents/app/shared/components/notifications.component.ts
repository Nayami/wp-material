import { Component, OnInit } from '@angular/core';
import {FlashNoticeService} from '../services/alert.dialog.modal/flash.notices'
@Component( {
	selector: 'FlashNotificationsComponent',
	template: `
		@TODO: notifications
	`
} )
export class FlashNotificationsComponent implements OnInit {

	constructor( private notifications: FlashNoticeService ) {
	}

	ngOnInit() {
	}
}