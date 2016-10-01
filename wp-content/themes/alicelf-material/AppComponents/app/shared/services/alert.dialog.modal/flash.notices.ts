import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Http, Response} from '@angular/http';
declare var AMdefaults: any;

@Injectable()
export class FlashNoticeService {

	notifications: any[] = [];
	notificationsChange: Subject<any> = new Subject<any>();
	endProcess : any;

	constructor( private http: Http ) {
		http.get( AMdefaults.ajaxurl + "?action=ajx20160830020813" )
		    .map( ( response: Response ) => response.json() )
		    .subscribe( availableNotices => {
			    if ( availableNotices ) {
				    for ( let ntc in availableNotices.notices ) {
					    let singleNotice = availableNotices.notices[ntc];
					    this.attachNotifications( {
						    message : singleNotice.message,
						    cssClass: 'mdl-color--blue-grey-300 mdl-color-text--blue-grey-900',
						    type    : 'system',
						    systemID: ntc
					    } );
				    }
			    }
		    } );
	}

	attachNotifications( notice ) {
		this.notifications.push( notice );
		this.notificationsChange.next( notice );
	}

	unplugNotification( notif ) {
		this.notifications.splice( this.notifications.indexOf( notif ), 1 );
		this.notificationsChange.next( notif );
	}

	unplugNotificationByIndex( index ) {
		this.notifications.splice( index, 1 );
		this.notificationsChange.next( index );
	}

	unplugSystemNotification( itemID ) {
		this.http.get( AMdefaults.ajaxurl + "?action=ajx20162830022821&body_data=" + itemID )
		    .map( ( response: Response ) => response.json() )
		    .subscribe( data => this.endProcess = data)
	}
}