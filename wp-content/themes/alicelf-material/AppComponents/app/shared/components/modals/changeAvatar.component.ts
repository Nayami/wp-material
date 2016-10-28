import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

import { ModalService } from "../../services/alert.dialog.modal/modal.service";
import { UserGlobalService } from "../../services/user.global.service";
// const body = AMFormService.dataToPost( "ajx20163519013508", formVal );
import {AMFormService} from "../../services/AMFormService";
import {AppSettingsService} from "../../services/app.settings.service";

@Component( {
	selector: 'ChangeAvatar',
	template: `
		<div id="change-avatar-form">
			<div class="input-filegroup">
				<input (change)="fileChange($event)" type="file" name="" id="chos3-file">
				<label for="chos3-file" class="mdl-button mdl-js-button mdl-button--raised">Select File</label>
			</div>
		</div>
	`
} )
export class ChangeAvatarComponent {

	private ajaxurl;

	constructor( private http: Http,
	             private modal: ModalService,
	             private userService: UserGlobalService,
	             private appSettings: AppSettingsService ) {
		this.ajaxurl = appSettings.settings.ajaxurl;
	}

	fileChange( fileInput: any ) {
		if ( fileInput.target.files && fileInput.target.files[0] ) {
			let file = fileInput.target.files[0];
			const body = AMFormService.dataToPost( "ajx20160628050625", {
				'newavatar': file
			} );

			this.http.post( this.ajaxurl, body )['map']
			( ( response: Response ) => response.json() )
				.subscribe( data => {
					if(data.status === 'success') {
						console.log( data.data );
						// @TODO: work with uploaded file
					}
				} );
		}
	}

}