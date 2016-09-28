import { Component, Output,
	EventEmitter, OnInit, OnDestroy,
	trigger, state, style, transition, animate } from '@angular/core';

import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { FlashNoticeService } from "../../shared/services/alert.dialog.modal/flash.notices";
import { UserGlobalService } from "../../shared/services/user.global.service";
import { AuthGlobalService } from "../../shared/services/auth.service";
import {AppSettingsService} from "../../shared/services/app.settings.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/user/views/';

@Component( {
	templateUrl: componentPath + 'auth.login.register.html',
	animations : [
		trigger( 'renderAuthTrigger', [
			state( 'in', style( { transform: 'translateY(0)', opacity: 1 } ) ),

			transition( 'void => *', [
				style( { transform: 'translateY(20%)', opacity: 0 } ),
				animate( '300ms ease' )
			] ),
			transition( '* => void', [
				animate( '300ms ease-out', style( { transform: 'translateY(-20%)', opacity: 0 } ) )
			] )
		] )
	]
} )

export class AMAuthComponent {
	private loginFormHandler: FormGroup;
	private registerFormHandler: FormGroup;
	private forgotEmitter: boolean = false;

	spinner: boolean = false;

	constructor( private router: Router,
	             private appSettings: AppSettingsService,
	             private userService: UserGlobalService,
	             private auth: AuthGlobalService,
	             private flashes: FlashNoticeService,
	             private fbuilder: FormBuilder ) {
		if ( !auth.loaded ) {
			this.loadAuthInfo();
		} else {
			if ( this.auth.authorized )
				this.router.navigate( [''] )
		}
		if(!appSettings.loaded)
			appSettings.setSettings();

		this.loginFormHandler = this.fbuilder.group( {
			fname: ["", Validators.required],
			passw: ["", Validators.required]
		} );
		this.registerFormHandler = this.fbuilder.group( {
			login  : ["", Validators.required],
			passw  : ["", Validators.required],
			confirm: ["", Validators.required]
		} );
	}


	loadAuthInfo() {
		return this.userService.getCurrentUser()
		           .subscribe( user => {
			           this.auth.loaded = true;
			           this.auth.authorized = user.ID ? true : false;
			           this.userService.currentUser = user;
			           if ( this.auth.authorized )
				           this.router.navigate( [''] )
		           } );
	}

	/**
	 * ==================== Login Action ======================
	 * 23.09.2016
	 */
	doLogin() {
		if ( this.loginFormHandler.status === "VALID" ) {
			this.spinner = true;
			this.auth.authorizeMe( this.loginFormHandler.value )
			    .subscribe( data => {
				    switch ( data.message ) {
					    case 'success' :
						    this.userService.currentUser = data.user;
						    this.auth.loaded = true;
						    this.auth.authorized = true;
						    this.router.navigate( [''] );
						    this.flashes.attachNotifications( {
							    message : 'Success !',
							    cssClass: 'mdl-color--green-900 mdl-color-text--green-50',
							    type    : 'dismissable',
						    } );
						    break;
					    case 'notfound' :
						    this.flashes.attachNotifications( {
							    message : 'User not found',
							    cssClass: 'mdl-color--red-900 mdl-color-text--red-50',
							    type    : 'dismissable',
						    } );
						    break;
					    case 'notmatch' :
						    this.flashes.attachNotifications( {
							    message : 'Password not match',
							    cssClass: 'mdl-color--amber-900 mdl-color-text--amber-50',
							    type    : 'dismissable',
						    } );
						    break;
					    default:
						    console.log( 'something wrong' );
				    }
				    this.spinner = false;
			    } );
		}
	}

	/**
	 * ==================== Registration Action ======================
	 * 23.09.2016
	 */
	doRegister() {

	}

	/**
	 * ==================== Forgot Password click ======================
	 * 23.09.2016
	 */
	invokeForgotPassword() {
		this.forgotEmitter = true;
	}

	launchInfoBack( event ) {
		this.forgotEmitter = event;
	}


}