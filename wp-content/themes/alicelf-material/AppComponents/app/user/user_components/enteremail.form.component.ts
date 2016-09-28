import { Component,
	Input, Output, EventEmitter,
	OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import {FlashNoticeService} from "../../shared/services/alert.dialog.modal/flash.notices";

@Component( {
	selector: 'enter-your-email',
	template: `
	<div id="forgot-pass-modal" dataDestroy class="modal-backdrop" [ngClass]="{show: formInfo.showclass, blockClass: formInfo.block}" itemscope="aa-modal" (click)="unplugModal($event)">
			<div class="aa-modal-container" data-animation="scale">

				<div class="loader-line-modal">
					<div *ngIf="progress" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
				</div>
				<a class="mdl-button mdl-js-button mdl-button--icon destroy-button">
					<i dataDestroy class="material-icons">close</i>
				</a>
				<div class="modal-body-content mdl-typography--text-center">
					<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input #youremail class="mdl-textfield__input" type="text" id="resetpass-input">
						<label class="mdl-textfield__label" for="resetpass-input">Enter Your Email</label>
					</div>
					<button (click)="submitProcess()" type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--orange-900 mdl-color-text--red-50">Send me restore password info</button>
				</div>
			</div>
		</div>
	`
} )
export class EnterEmailComponent {
	@Input() launchINfo : boolean;
	@Output() launchInfoBack = new EventEmitter<any>();
	private bodyelem = document.getElementsByTagName('body')[0];
	progress : boolean = false;

	private formInfo : any = {
		showclass : false,
		block : false
	};

	constructor(private flashes: FlashNoticeService) {}

	ngOnChanges( changes: SimpleChanges ) {
		let referLaunch = changes['launchINfo'].currentValue;
		if ( referLaunch === true) {
			this.formInfo.block = true;
			this.bodyelem.classList.add('aa-modal-overlay');
			setTimeout( () => {
				this.formInfo.showclass = true;
			}, 30 );
		}
	}

	submitProcess(){
		this.progress = true;
	}

	// close modal via click
	unplugModal( event ) {
		let target = event.target || event.srcElement || event.currentTarget;
		if ( target.attributes.dataDestroy !== undefined ) {
			this.closeModal();
		}
	}

	closeModal(){
		this.formInfo.showclass = false;
		this.launchInfoBack.emit(false);
		setTimeout( ()=> {
			this.formInfo.block = false;
			this.bodyelem.classList.remove('aa-modal-overlay');
			this.progress = false;
		}, 500 );
	}

}