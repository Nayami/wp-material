import { Injectable } from '@angular/core';

@Injectable()
export class FlashNoticeService {

	private notifications: any[] = [];
	private dismisableNotices: any[] = [];

	constructor() {

	}

}