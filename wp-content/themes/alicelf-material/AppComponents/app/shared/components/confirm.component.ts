import { Component } from '@angular/core';
import { GlobConfirmService } from "../services/alert.dialog.modal/confirm.service";
declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/shared/components/views';

@Component( {
	selector: 'GlobConfirmComponent',
	templateUrl: componentPath + '/alert.confirm.html'
} )
export class GlobConfirmComponent {

	constructor( private confirmService: GlobConfirmService ) {

	}

	confirmFunc() {
		let answer = this.confirmService.confirmDialog;
		answer.dialogAnswer = true;
		this.confirmService.invokeAnswer( answer );
	}

	decline( event ) {
		let target        = event.target || event.srcElement || event.currentTarget,
		    parentMatches = target.parentNode.nodeName === "A"
			    && target.parentNode.attributes.dataDestroy !== undefined;

		if ( target.attributes.dataDestroy !== undefined || parentMatches ) {
			let answer = this.confirmService.confirmDialog;
			answer.dialogAnswer = false;
			this.confirmService.invokeAnswer( answer );
		}
	}

}