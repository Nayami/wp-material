import { Component,
	Input, Output, EventEmitter,
	OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component( {
	selector: 'enter-your-email',
	template: `
	<div id="forgot-pass-modal" dataDestroy class="modal-backdrop" [ngClass]="{show: formInfo.showclass, blockClass: formInfo.block}" itemscope="aa-modal" (click)="unplugModal($event)">
			<div class="aa-modal-container" data-animation="scale">
				<div id="modal-progressline" data-progress></div>
				<a class="mdl-button mdl-js-button mdl-button--icon destroy-button">
					<i dataDestroy class="material-icons">close</i>
				</a>
				<div class="modal-body-content mdl-typography--text-center">
					There will be form.
				</div>
			</div>
		</div>
	`
} )
export class EnterEmailComponent {
	@Input() launchINfo : boolean;
	@Output() launchInfoBack = new EventEmitter<any>();
	private bodyelem = document.getElementsByTagName('body')[0];

	private formInfo : any = {
		showclass : false,
		block : false
	};

	constructor() {}

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

	unplugModal( event ) {
		let target = event.target || event.srcElement || event.currentTarget;
		if ( target.attributes.dataDestroy !== undefined ) {
			this.formInfo.showclass = false;
			this.launchInfoBack.emit(false);
			setTimeout( ()=> {
				this.formInfo.block = false;
				this.bodyelem.classList.remove('aa-modal-overlay');
			}, 500 );
		}
	}
}