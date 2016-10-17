import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ModalService {

	modalChange: Subject<any> = new Subject<any>();
	private bodyelem = document.getElementsByTagName( 'body' )[0];
	currentID: any;
	render: boolean = false;
	showClass: boolean = false;

	dialogObject : any;

	/**
	 * ==================== Open dialog ======================
	 */
	launchModal( data ) {
		this.dialogObject = data;
		this.render = true;
		this.bodyelem['classList'].add( 'aa-modal-overlay' );
		setTimeout( ()=> {
			this.showClass = true
		}, 50 );
	}

	/**
	 * ==================== Receive data from modal.component ======================
	 */
	invokeAnswer( data ) {
		this.modalChange.next( data );
	}

	/**
	 * ==================== Destroy dialog =====================
	 */
	unplugModal() {
		this.showClass = false;
		setTimeout( ()=> {
			this.render = false;
			this.bodyelem['classList'].remove( 'aa-modal-overlay' );
		}, 500 );
	}

	constructor() {}
}