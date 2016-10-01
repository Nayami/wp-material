import { Component, Output,
	EventEmitter, OnInit, OnDestroy,
	trigger, state, style, transition, animate } from '@angular/core';

import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

import { FlashNoticeService } from "../../shared/services/alert.dialog.modal/flash.notices";
import { UserGlobalService } from "../../shared/services/user.global.service";
import { AuthGlobalService } from "../../shared/services/auth.service";
import { AppSettingsService } from "../../shared/services/app.settings.service";

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
	private strategy: string = null;

	spinner: boolean = false;

	constructor( private router: Router,
	             private http: Http,
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

		this.loginFormHandler = this.fbuilder.group( {
			fname: ["", [Validators.required, Validators.minLength( 5 )]],
			passw: ["", Validators.required]
		} );

		appSettings.getSettings()
		           .subscribe( data => {
			           appSettings.settings = data;
			           appSettings.loaded = true;

			           if ( appSettings.settings.auth_info.registration_info === 'yes' ) {
				           this.strategy = appSettings.settings.auth_info.registration_strategy;
				           this.setRegistrationForm();
			           }

		           } );

	}

	static authEmailValidation( control: FormControl ): {[s:string]:boolean} {
		let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if ( !pattern.test( control.value ) ) {
			return { email: true };
		}
		return null;
	}

	/**
	 * ==================== Set form rules ======================
	 */
	setRegistrationForm() {
		switch ( this.strategy ) {
			case "no_confirm" :
				this.registerFormHandler = this.fbuilder.group( {
					login  : ["", [AMAuthComponent.authEmailValidation]],
					passw  : ["", Validators.required],
					confirm: ["", Validators.required]
				} );
				break;
			case "confirm_before" :
				this.registerFormHandler = this.fbuilder.group( {
					login: ["", AMAuthComponent.authEmailValidation]
				} );
				break;
			case "confirm_after" :
				this.registerFormHandler = this.fbuilder.group( {
					login  : ["", AMAuthComponent.authEmailValidation],
					passw  : ["", Validators.required],
					confirm: ["", Validators.required]
				} );
				break;
			default :
				console.log( "unknown" );
		}
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
							    cssClass: 'mdl-color--green-800 mdl-color-text--green-50',
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
	 */
	doRegister() {
		if ( this.registerFormHandler.status === "VALID" ) {
			let formData = this.registerFormHandler.value;
			let headers = new Headers( { "Content-Type": "application/x-www-form-urlencoded" } );
			const body = "action=ajx20162929092956&body_data=" + JSON.stringify( formData );

			if ( this.strategy === 'confirm_before' ) {
				// @TODO: Confirm Before
				this.http.post( AMdefaults.ajaxurl, body, { headers: headers } )
				    .map( ( response: Response ) => response.json() )
				    .subscribe( data => {

					    switch ( data.status ) {
						    case "user_exists" :
							    this.flashes.attachNotifications( {
								    message : 'Sorry, this email already taken!',
								    cssClass: 'mdl-color--amber-800 mdl-color-text--amber-50',
								    type    : 'dismissable',
							    } );
							    break;
						    case "email_fail" :
							    this.flashes.attachNotifications( {
								    message : 'Something happend with email server, try again later',
								    cssClass: 'mdl-color--amber-800 mdl-color-text--amber-50',
								    type    : 'dismissable',
							    } );
							    break;
						    case "success" :

							    if ( data.check_mail ) {
								    this.flashes.attachNotifications( {
									    message : 'Check your email for confirmation link!',
									    cssClass: 'mdl-color--blue-grey-500 mdl-color-text--blue-grey-50',
									    type    : 'dismissable',
								    } );
							    }
							    break;
						    default :
							    console.log( "unknown" );
					    }
					    (<FormControl>this.registerFormHandler.controls['login']).setValue( "", {} );
				    } )
			} else {
				/**
				 * REGISTRATION FOR confirm after and without confirm
				 */
				if ( formData.passw === formData.confirm ) {
					this.http.post( AMdefaults.ajaxurl, body, { headers: headers } )
					    .map( ( response: Response ) => response.json() )
					    .subscribe( data => {

						    switch ( data.status ) {
							    case "user_exists" :
								    this.flashes.attachNotifications( {
									    message : 'Sorry, this email already taken!',
									    cssClass: 'mdl-color--amber-800 mdl-color-text--amber-50',
									    type    : 'dismissable',
								    } );
								    break;
							    case "success" :
								    this.flashes.attachNotifications( {
									    message : 'You successfully registered!',
									    cssClass: 'mdl-color--green-800 mdl-color-text--green-50',
									    type    : 'dismissable',
								    } );
								    if ( data.check_mail ) {
									    this.flashes.attachNotifications( {
										    message : 'Check your email',
										    cssClass: 'mdl-color--blue-800 mdl-color-text--blue-50',
										    type    : 'dismissable',
									    } );
								    }
								    this.userService.currentUser = data.user;
								    this.auth.loaded = true;
								    this.auth.authorized = true;
								    this.router.navigate( [''] );
								    break;
							    default :
								    console.log( "unknown" );
						    }
						    (<FormControl>this.registerFormHandler.controls['login']).setValue( "", {} );
						    (<FormControl>this.registerFormHandler.controls['passw']).setValue( "", {} );
						    (<FormControl>this.registerFormHandler.controls['confirm']).setValue( "", {} );
					    } );


				} else {
					this.flashes.attachNotifications( {
						message : 'Password and confirmation should match!',
						cssClass: 'mdl-color--amber-800 mdl-color-text--amber-50',
						type    : 'dismissable',
					} );
				}
			}

		} else {
			this.flashes.attachNotifications( {
				message : 'Fill correct all fields!',
				cssClass: 'mdl-color--red-800 mdl-color-text--red-50',
				type    : 'dismissable',
			} );
		}
	}

	/**
	 * ==================== Forgot Password click ======================
	 */
	invokeForgotPassword() {
		this.forgotEmitter = true;
	}

	launchInfoBack( event ) {
		this.forgotEmitter = event;
	}

}