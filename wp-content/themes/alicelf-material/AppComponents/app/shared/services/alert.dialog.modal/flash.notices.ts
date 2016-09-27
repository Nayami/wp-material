import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class FlashNoticeService {

	notifications: any[] = [];
	notificationsChange: Subject<any> = new Subject<any>();

	constructor() {}

	attachNotifications (notice) {
		this.notifications.push(notice);
		this.notificationsChange.next(notice);
	}

	unplugNotification(notif) {
		this.notifications.splice(this.notifications.indexOf(notif), 1);
		this.notificationsChange.next(notif);
	}

	unplugNotificationByIndex(index) {
		this.notifications.splice(index, 1);
		this.notificationsChange.next(index);
	}

}