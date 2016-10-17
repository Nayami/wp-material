import { Component } from '@angular/core';
import {ModalService} from "../services/alert.dialog.modal/modal.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/shared/components/views';

@Component( {
	selector   : 'ModalDialogComponent',
	templateUrl: componentPath + "/modal.component.html"
} )

export class ModalDialogComponent {

	constructor(private modal : ModalService) {
	}

	confirmFunc() {
		let answer = this.modal.dialogObject;
		answer.dialogAnswer = true;
		this.modal.invokeAnswer( answer );
	}

	decline( event ) {
		let target        = event.target || event.srcElement || event.currentTarget,
		    parentMatches = target.parentNode.nodeName === "A"
			    && target.parentNode.attributes.dataDestroy !== undefined;

		if ( target.attributes.dataDestroy !== undefined || parentMatches ) {
			let answer = this.modal.dialogObject;
			answer.dialogAnswer = false;
			this.modal.invokeAnswer( answer );
		}
	}
	/**
	 * ==================== Extend answers there ======================
	 */

}