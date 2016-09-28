import { Component,
	Input, Output, EventEmitter, OnDestroy,
	OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';
import { FlashNoticeService } from "../../shared/services/alert.dialog.modal/flash.notices";
declare var AMdefaults: any;

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
						<input [(ngModel)]="emailvalue" class="mdl-textfield__input" type="text" id="resetpass-input">
						<label class="mdl-textfield__label" for="resetpass-input">Enter Your Email</label>
					</div>
					<button (click)="submitProcess(emailvalue)" type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--orange-900 mdl-color-text--red-50">Send me restore password info</button>
				</div>
			</div>
		</div>
	`
} )
export class EnterEmailComponent implements OnDestroy {

	@Input() launchINfo: boolean;
	@Output() launchInfoBack = new EventEmitter<any>();
	private bodyelem = document.getElementsByTagName( 'body' )[0];
	private confirmForm: Subscription;
	progress: boolean = false;
	emailvalue: string = "";

	private formInfo: any = {
		showclass: false,
		block    : false
	};

	constructor( private flashes: FlashNoticeService, private http: Http ) {
	}

	ngOnChanges( changes: SimpleChanges ) {
		let referLaunch = changes['launchINfo'].currentValue;
		if ( referLaunch === true ) {
			this.formInfo.block = true;
			this.bodyelem.classList.add( 'aa-modal-overlay' );
			setTimeout( () => {
				this.formInfo.showclass = true;
			}, 30 );
		}
	}

	/**
	 * ==================== Handle Email submition ======================
	 */
	submitProcess( value ) {
		this.progress = true;
		if ( EnterEmailComponent.validateEmail( value ) ) {
			this.confirmForm = this.sendData( value )
			                       .subscribe( data => {
				                       console.log( data );
				                       this.closeModal();
			                       } )
		} else {
			this.closeModal();
			this.flashes.attachNotifications( {
				message : 'Enter valid email!',
				cssClass: 'mdl-color--red-900 mdl-color-text--red-50',
				type    : 'dismissable',
			} );
		}
	}

	sendData( value ): Observable<any> {
		let headers = new Headers( { "Content-Type": "application/x-www-form-urlencoded" } );
		const body = "action=ajx20165728055701&body_data=" + JSON.stringify( value );
		return this.http.post( AMdefaults.ajaxurl, body, { headers: headers } )
		           .map( response => response.json() )
	}

	// close modal via click
	unplugModal( event ) {
		let target = event.target || event.srcElement || event.currentTarget;
		if ( target.attributes.dataDestroy !== undefined ) {
			this.closeModal();
		}
	}

	closeModal() {
		this.formInfo.showclass = false;
		this.launchInfoBack.emit( false );
		this.emailvalue = "";
		this.progress = false;

		setTimeout( ()=> {
			this.formInfo.block = false;
			this.bodyelem.classList.remove( 'aa-modal-overlay' );
			this.progress = false;
		}, 500 );
	}

	ngOnDestroy(): void {
		this.confirmForm.unsubscribe();
	}

	static validateEmail( email ) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test( email );
	}

}