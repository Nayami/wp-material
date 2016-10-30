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
import {FlashNoticeService} from "../../services/alert.dialog.modal/flash.notices";

declare var $: any;

@Component( {
	selector: 'ChangeAvatar',
	template: `
		<div id="change-avatar-form">
			<div class="loader-line-modal">
				<div *ngIf="progressline" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
			</div>
			<div class="mdl-grid">
				<div class="mdl-cell--6-col image-promise">
					<div *ngIf="uploadedImage" id="upload-ava-holder">
						<img id="uploadedImagePromise" [src]="uploadedImage" alt="uploaded image">
					</div>
				</div>
				<div class="mdl-cell--6-col images-actions">
					<div class="mdl-grid">
						<div class="img-preview preview-lg"></div>
					</div>
					<div class="mdl-grid">
						@TODO: crop buttons
					</div>
				</div>
			</div>
			<div class="mdl-grid">
				<div *ngIf="!uploadedImage" class="input-filegroup mdl-cell--12-col">
					<input (change)="fileChange($event)" type="file" name="" id="chos3-file">
					<label for="chos3-file" class="mdl-button mdl-js-button mdl-button--raised">Upload Image</label>
				</div>
				<div *ngIf="uploadedImage" class="mdl-cell--12-col">
					<a (click)="cropImage()" class="mdl-button am-success-btn mdl-js-button mdl-button--raised mdl-js-ripple-effect">Crop and set as profile image</a>
					</div>
			</div>

		</div>
	`
} )
export class ChangeAvatarComponent implements OnDestroy {

	progressline: boolean = false;

	fileuploadSubscription: Subscription;
	submitCrop: Subscription;

	private ajaxurl;
	public uploadedImage;     // Image Url
	private imageObject;      // jQuery object
	private imageDbData;      // system image data
	private cropOptions: any; // aspect ratio e.t.c
	private cropData: any;    // crop tool current position

	constructor( private http: Http,
	             private modal: ModalService,
	             private userService: UserGlobalService,
	             private flashes: FlashNoticeService,
	             private appSettings: AppSettingsService ) {
		this.ajaxurl = appSettings.settings.ajaxurl;
	}

	fileChange( fileInput: any ) {
		this.progressline = true;

		if ( fileInput.target.files && fileInput.target.files[0] ) {
			let file = fileInput.target.files[0];
			const body = AMFormService.dataToPost( "ajx20160628050625", {
				'newavatar': file
			} );

			this.fileuploadSubscription = this.http.post( this.ajaxurl, body )['map']
			( ( response: Response ) => response.json() )
				.subscribe( data => {
					if ( data.status === 'success' ) {
						this.imageDbData = data.data[0];
						this.uploadedImage = this.imageDbData.src;

						let waitForimage = setInterval( ()=> {
							if ( document.getElementById( 'uploadedImagePromise' ) ) {
								this.imageObject = $( '#uploadedImagePromise' );
								let avatarWrapper = document.getElementById( 'upload-ava-holder' );

								avatarWrapper.style.maxWidth = this.imageObject.width() + "px";
								avatarWrapper.style.maxHeight = this.imageObject.height() + "px";

								this.cropOptions = {
									aspectRatio             : 8 / 10,
									toggleDragModeOnDblclick: false,
									zoomable                : false,
									preview                 : '.img-preview',
									crop                    : ( e ) => {
										this.cropData = {
											offsetX: Math.round( e.x ),
											offsetY: Math.round( e.y ),
											width  : Math.round( e.width ),
											height : Math.round( e.height ),
											rotate : e.rotate,
											scaleX : e.scaleX,
											scaleY : e.scaleY
										};
									}
								};
								this.imageObject.cropper( this.cropOptions );
								clearInterval( waitForimage );
							}
						}, 50 );

					} else {
						this.modal.invokeAnswer( false );
						this.modal.unplugModal();

						switch ( data.message ) {
							case "filesize_exceed":
								this.flashes.attachNotifications( {
									message : 'File is to large.',
									cssClass: 'mdl-color--orange-100 mdl-color-text--orange-700',
									type    : 'dismissable',
								} );
								break;
							case "wrong_type":
								this.flashes.attachNotifications( {
									message : 'Wrong File Type (only .jpg/.jpeg and .png allowed)',
									cssClass: 'mdl-color--orange-100 mdl-color-text--orange-700',
									type    : 'dismissable',
								} );
								break;
							default:
								console.log( "FAIL: ", data.message );
								this.flashes.attachNotifications( {
									message : 'Something wrong. File Not loaded!',
									cssClass: 'mdl-color--red-200 mdl-color-text--red-900',
									type    : 'dismissable',
								} );
						}
					}
					this.progressline = false;
				} );
		}
	}

	cropImage(): void {
		this.progressline = true;

		const body = AMFormService.dataToPost( "ajx20162129102106", {
			imageDbData: JSON.stringify( this.imageDbData ),
			cropData   : JSON.stringify( this.cropData )
		} );

		this.submitCrop = this.http.post( this.ajaxurl, body )['map']
		( ( response: Response ) => response.json() )
			.subscribe( data => {
				if ( data.status === 'success' ) {
					this.modal.invokeAnswer( {
						id          : this.modal.currentID,
						status      : 'success',
						newImageData: data.newImageData
					} );
				} else {
					this.modal.invokeAnswer( false );
				}

				this.progressline = false;
			} );

	}

	ngOnDestroy(): void {
		if ( this.fileuploadSubscription )
			this.fileuploadSubscription.unsubscribe();
		if ( this.submitCrop )
			this.submitCrop.unsubscribe();
	}

}