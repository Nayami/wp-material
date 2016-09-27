import { Component, trigger, state, style, transition, animate } from '@angular/core';
import {FlashNoticeService} from '../services/alert.dialog.modal/flash.notices'
@Component( {
	selector  : 'FlashNotificationsComponent',
	template  : `
	<div id="header-notifications">
		<ul>
			<li *ngFor="let flash of flashes.notifications" [@flyInOut] class="{{flash.cssClass}}">
				<a *ngIf="flash.type === 'dismissable'" class="mdl-button mdl-js-button mdl-button--icon destroy-button" (click)="unplugNotice(flash)"><i class="material-icons">close</i>
				</a>{{flash.message}}
			</li>
		</ul>
	</div>

	`,
	animations: [
		trigger( 'flyInOut', [
			state( 'in', style( { transform: 'translateX(0)', opacity: 0 } ) ),

			transition( 'void => *', [
				style( { transform: 'translateX(40%)', opacity: 1 } ),
				animate( '300ms ease-out' )
			] ),
			transition( '* => void', [
				animate( '300ms ease-in', style( { transform: 'translateX(100%)', opacity: 0 } ) )
			] )
		] )
	]
} )
export class FlashNotificationsComponent {

	private componentNotices;

	constructor( private flashes: FlashNoticeService ) {
		flashes.notificationsChange.subscribe( changes => {
			this.componentNotices = changes;
			if ( flashes.notifications.length > 2 ) {
				let cntr = flashes.notifications.length;
				if ( cntr > 3 ) {
					let noticesInterval = setInterval( ()=> {
						flashes.unplugNotificationByIndex( cntr - 1 );
						cntr--;
						if ( cntr < 1 ) {
							clearInterval( noticesInterval );
						}
					}, 2000 );
				}
			}
		} )
	}

	unplugNotice( item ) {
		this.flashes.unplugNotification( item );
	}


}