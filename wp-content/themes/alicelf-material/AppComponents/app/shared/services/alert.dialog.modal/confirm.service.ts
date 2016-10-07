import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class GlobConfirmService {
	confirmationChange: Subject<any> = new Subject<any>();
	private bodyelem = document.getElementsByTagName( 'body' )[0];
	currentID: any;
	display: boolean = false;
	showClass: boolean = false;

	alertDialog: any = {
		dialogClass  : null,
		dialogMessage: null
	};

	confirmDialog: any = {
		id           : null,
		dialogClass  : null,
		dialogMessage: null,
		dialogAnswer : null
	};

	launchConfirm( data ) {
		this.confirmDialog = data;
		this.display = true;
		this.bodyelem['classList'].add( 'aa-modal-overlay' );
		setTimeout( ()=> {
			this.showClass = true
		}, 50 );
	}

	invokeAnswer( data ) {
		this.confirmationChange.next( data );
	}

	unplugConfirmation() {
		this.showClass = false;
		this.confirmDialog = {
			id           : null,
			dialogClass  : null,
			dialogMessage: null,
			dialogAnswer : null
		};
		setTimeout( ()=> {
			this.display = false;
			this.bodyelem['classList'].remove( 'aa-modal-overlay' );
		}, 500 );
	}


	constructor() {
	}
}