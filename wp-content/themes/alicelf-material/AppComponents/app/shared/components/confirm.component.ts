import { Component } from '@angular/core';
import { GlobConfirmService } from "../services/alert.dialog.modal/confirm.service";

@Component( {
	selector: 'GlobConfirmComponent',

	template: `
		<div id="global-confirm-dialog" *ngIf="confirmService.display" class="modal-backdrop"
			[ngClass]="{show: confirmService.showClass, blockClass: confirmService.display}"
			itemscope="aa-modal" (click)="decline($event)" dataDestroy>

		<div class="aa-modal-container {{confirmService.confirmDialog.dialogClass}}" data-animation="scale">
			<div class="mdl-grid">
				<span class="icon-wrapper"><i class="material-icons">warning</i></span>
				<div class="mdl-cell mdl-cell--12-col mdl-typography--text-center">
					<p>{{confirmService.confirmDialog.dialogMessage}}</p>
				</div>

				<footer *ngIf="confirmService.confirmDialog.showButtons" class="mdl-cell mdl-cell--12-col mdl-typography--text-center">
					<a dataDestroy (click)="decline($event)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Decline</a>
					<a (click)="confirmFunc()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--cyan-800 mdl-color-text--cyan-50">Confirm</a>
				</footer>
			</div>
		</div>

	</div>
	`
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