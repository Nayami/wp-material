import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {DialogInterface} from "../../mocks/dialog.interface";


@Injectable()
export class GlobConfirmService {
	confirmationChange: Subject<any> = new Subject<any>();
	private bodyelem = document.getElementsByTagName( 'body' )[0];
	currentID: any;
	display: boolean = false;
	showClass: boolean = false;

	confirmDialog: DialogInterface;

	/**
	 * ==================== Open dialog ======================
	 */
	launchConfirm( data ) {
		this.confirmDialog = data;
		this.display = true;
		this.bodyelem['classList'].add( 'aa-modal-overlay' );
		setTimeout( ()=> {
			this.showClass = true
		}, 50 );
	}

	/**
	 * ==================== Receive data from confirm.component ======================
	 */
	invokeAnswer( data ) {
		this.confirmationChange.next( data );
	}

	/**
	 * ==================== Destroy dialog =====================
	 */
	unplugConfirmation() {
		this.showClass = false;
		setTimeout( ()=> {
			this.display = false;
			this.bodyelem['classList'].remove( 'aa-modal-overlay' );
		}, 500 );
	}


	constructor() {}
}