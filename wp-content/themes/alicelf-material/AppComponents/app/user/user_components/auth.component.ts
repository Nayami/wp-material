import { Component, Output,
	EventEmitter, OnInit, OnDestroy,
	trigger, state, style, transition, animate } from '@angular/core';

import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

import { FlashNoticeService } from "../../shared/services/alert.dialog.modal/flash.notices";
import { UserGlobalService } from "../../shared/services/user.global.service";
import { AuthGlobalService } from "../../shared/services/auth.service";
import { AppSettingsService } from "../../shared/services/app.settings.service";
import { LayoutDataService } from "../../shared/services/layout.data.service";
import { AMFormService } from "../../shared/services/AMFormService";

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
	             private layoutData: LayoutDataService,
	             private flashes: FlashNoticeService,
	             private fbuilder: FormBuilder ) {
		if ( !auth.loaded ) {
			this.loadAuthInfo();
		} else {
			if ( this.auth.authorized )
				this.router.navigate( ['/'] )
		}

		this.loginFormHandler = this.fbuilder.group( {
			fname: ["", [Validators.required, Validators.minLength( 5 )]],
			passw: ["", Validators.required]
		} );

		if ( appSettings.settings.themeSettings.auth_info.registration_info === 'yes' ) {
			this.strategy = appSettings.settings.themeSettings.auth_info.registration_strategy;
			this.setRegistrationForm();
		}

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
					passw  : ["", [Validators.required, Validators.minLength( 5 )]],
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
					passw  : ["", [Validators.required, Validators.minLength( 5 )]],
					confirm: ["", Validators.required]
				} );
				break;
			default :
				console.log( "unknown" );
		}
	}

	loadAuthInfo() {
		return this.userService.getUser()
		           .subscribe( user => {
			           this.auth.loaded = true;
			           this.auth.authorized = user.ID ? true : false;
			           this.userService.currentUser = user;
			           if ( this.auth.authorized )
				           this.router.navigate( ['/'] );

			           this.layoutData.invokeLoad();
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
						    this.router.navigate( ['/'] );
						    this.flashes.attachNotifications( {
							    message : 'Success !',
							    cssClass: 'mdl-color--green-200 mdl-color-text--green-900',
							    type    : 'dismissable',
						    } );

						    break;
					    case 'notfound' :
						    this.flashes.attachNotifications( {
							    message : 'User not found',
							    cssClass: 'mdl-color--red-200 mdl-color-text--red-900',
							    type    : 'dismissable',
						    } );
						    break;
					    case 'notmatch' :
						    this.flashes.attachNotifications( {
							    message : 'Password not match',
							    cssClass: 'mdl-color--orange-100 mdl-color-text--orange-700',
							    type    : 'dismissable',
						    } );
						    break;
					    default:
						    console.log( data );
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
			let regValues = this.registerFormHandler.value;
			const body = AMFormService.dataToPost( "ajx20162929092956", regValues );

			if ( this.strategy === 'confirm_before' ) {

				this.http.post( AMdefaults.ajaxurl, body )['map']
				( ( response: Response ) => response.json() )
					.subscribe( data => {

						switch ( data.status ) {
							case "user_exists" :
								this.flashes.attachNotifications( {
									message : 'Sorry, this email already taken!',
									cssClass: 'mdl-color--orange-100 mdl-color-text--orange-900',
									type    : 'dismissable',
								} );
								break;
							case "email_fail" :
								this.flashes.attachNotifications( {
									message : 'Something happend with email server, try again later',
									cssClass: 'mdl-color--orange-100 mdl-color-text--orange-900',
									type    : 'dismissable',
								} );
								break;
							case "success" :

								if ( data.check_mail ) {
									this.flashes.attachNotifications( {
										message : 'Check your email for confirmation link!',
										cssClass: 'mdl-color--blue-grey-300  mdl-color-text--blue-grey-900',
										type    : 'dismissable',
									} );
								}
								break;
							default :
								console.log( data );
						}
						(<FormControl>this.registerFormHandler.controls['login']).setValue( "", {} );
					} )
			} else {
				/**
				 * REGISTRATION FOR confirm after and without confirm
				 */
				if ( regValues.passw === regValues.confirm ) {
					this.http.post( AMdefaults.ajaxurl, body )['map']
					( ( response: Response ) => response.json() )
						.subscribe( data => {

							switch ( data.status ) {
								case "user_exists" :
									this.flashes.attachNotifications( {
										message : 'Sorry, this email already taken!',
										cssClass: 'mdl-color--blue-200 mdl-color-text--blue-900',
										type    : 'dismissable',
									} );
									break;
								case "success" :
									this.flashes.attachNotifications( {
										message : 'You successfully registered!',
										cssClass: 'mdl-color--green-200 mdl-color-text--green-900',
										type    : 'dismissable',
									} );
									if ( data.check_mail ) {
										this.flashes.attachNotifications( {
											message : 'Check your email',
											cssClass: 'mdl-color--blue-grey-300 mdl-color-text--blue-grey-900',
											type    : 'dismissable',
										} );
									}
									this.userService.currentUser = data.user;
									this.auth.loaded = true;
									this.auth.authorized = true;
									this.router.navigate( ['/'] );
									break;
								default :
									console.log( data );
							}
							(<FormControl>this.registerFormHandler.controls['login']).setValue( "", {} );
							(<FormControl>this.registerFormHandler.controls['passw']).setValue( "", {} );
							(<FormControl>this.registerFormHandler.controls['confirm']).setValue( "", {} );
						} );


				} else {
					this.flashes.attachNotifications( {
						message : 'Password and confirmation should match!',
						cssClass: 'mdl-color--orange-100 mdl-color-text--orange-900',
						type    : 'dismissable',
					} );
				}
			}

		} else {

			/**
			 * ==================== Handle Errors ======================
			 * 01.10.2016
			 */
			let ctrls = this.registerFormHandler.controls;
			for ( var control in ctrls ) {
				let ctrl = ctrls[control];
				if ( ctrl.errors ) {
					let thisErr = Object.keys( ctrl.errors )[0];
					let controlMap = {
						login  : 'Login',
						passw  : 'Password',
						confirm: 'Password confirmation'
					};

					switch ( thisErr ) {
						case "email" :
							this.flashes.attachNotifications( {
								message : 'Provide correct email for ' + controlMap[control],
								cssClass: 'mdl-color--red-200 mdl-color-text--red-900',
								type    : 'dismissable',
							} );
							break;
						case "required" :
							this.flashes.attachNotifications( {
								message : controlMap[control] + " Cannot be blank",
								cssClass: 'mdl-color--red-200 mdl-color-text--red-900',
								type    : 'dismissable',
							} );
							break;
						case "minlength" :
							this.flashes.attachNotifications( {
								message : controlMap[control] + " Too Short",
								cssClass: 'mdl-color--red-200 mdl-color-text--red-900',
								type    : 'dismissable',
							} );
							break;
						default:
							this.flashes.attachNotifications( {
								message : 'Fill correct all fields!',
								cssClass: 'mdl-color--red-200 mdl-color-text--red-900',
								type    : 'dismissable',
							} );
					}
				}
			}


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