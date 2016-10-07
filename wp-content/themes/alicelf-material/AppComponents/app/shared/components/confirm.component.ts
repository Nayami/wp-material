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
				<div class="mdl-cell mdl-cell--12-col mdl-typography--text-center">
					<p>{{confirmService.confirmDialog.dialogMessage}}</p>
				</div>

				<footer class="mdl-cell mdl-cell--12-col mdl-typography--text-center">
					<button dataDestroy (click)="decline($event)" type="button" class="mdl-button mdl-js-button mdl-button--raised">Decline</button>
					<button (click)="confirmFunc()" type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-color--blue-grey-300  mdl-color-text--blue-grey-900">Confirm</button>
				</footer>
			</div>
		</div>

	</div>
	`
} )
export class GlobConfirmComponent {

	constructor( private confirmService: GlobConfirmService ) {}

	confirmFunc() {
		let answer = this.confirmService.confirmDialog;
		answer.dialogAnswer = true;
		this.confirmService.invokeAnswer( answer );
	}

	decline( event ) {
		let target = event.target || event.srcElement || event.currentTarget;
		if ( target.attributes.dataDestroy !== undefined ) {
			let answer = this.confirmService.confirmDialog;
			answer.dialogAnswer = false;
			this.confirmService.invokeAnswer( answer );
		}
	}

}