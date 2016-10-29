import { Component, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

import { ModalService } from "../../services/alert.dialog.modal/modal.service";
import { UserGlobalService } from "../../services/user.global.service";
// const body = AMFormService.dataToPost( "ajx20163519013508", formVal );
import {AMFormService} from "../../services/AMFormService";
import {AppSettingsService} from "../../services/app.settings.service";

declare var $: any;

@Component( {
	selector: 'ChangeAvatar',
	template: `
		<div id="change-avatar-form">
			<div class="mdl-grid">
				<div class="mdl-cell--6-col image-promise">
					<div *ngIf="uploadedImage" id="upload-ava-holder">
						<img id="uploadedImagePromise" [src]="uploadedImage" alt="uploaded image">
					</div>
				</div>
				<div class="mdl-cell--6-col images-actions">
					<div class="img-preview preview-lg"></div>
				</div>
			</div>
			<div class="mdl-grid">
				<div class="input-filegroup mdl-cell--12-col">
					<input (change)="fileChange($event)" type="file" name="" id="chos3-file">
					<label for="chos3-file" class="mdl-button mdl-js-button mdl-button--raised">Upload Image</label>
				</div>
			</div>

		</div>
	`
} )
export class ChangeAvatarComponent implements OnDestroy {


	fileuploadSubscription: Subscription;

	private ajaxurl;
	public uploadedImage;     // Image Url
	private imageObject;      // jQuery object
	private imageDbData;      // system image data
	private cropOptions: any; // aspect ratio e.t.c
	private cropData: any;    // crop tool current position

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

			this.fileuploadSubscription = this.http.post( this.ajaxurl, body )['map']
			( ( response: Response ) => response.json() )
				.subscribe( data => {
					if ( data.status === 'success' ) {
						console.log( data );
						this.imageDbData = data.data[0];
						this.uploadedImage = this.imageDbData.src;

						let waitForimage = setInterval( ()=> {
							if ( document.getElementById( 'uploadedImagePromise' ) ) {
								this.imageObject = $( '#uploadedImagePromise' );
								this.cropOptions = {
									aspectRatio: 8 / 10,
									preview    : '.img-preview',
									crop       : ( e ) => {
										this.cropData = {
											offsetX: Math.round( e.x ),
											offsetY: Math.round( e.y ),
											width  : Math.round( e.width ),
											height : Math.round( e.height ),
											rotate : e.rotate,
											scaleX : e.scaleX,
											scaleY : e.scaleY
										};
										console.log( this.cropData );
									}
								};
								this.imageObject.cropper( this.cropOptions );
								clearInterval( waitForimage );
							}
						}, 50 );

					}
				} );
		}
	}

	ngOnDestroy(): void {
		if ( this.fileuploadSubscription ) {
			this.fileuploadSubscription.unsubscribe();
		}
	}

}