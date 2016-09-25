import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { AuthService } from "../services/auth.service";

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

export class AMAuthComponent implements OnDestroy {

	private userSubscription: Subscription;
	private loginFormHandler: FormGroup;
	private registerFormHandler: FormGroup;

	spinner : boolean = false;

	constructor( private router: Router,
	             private userService: UserService,
	             private auth: AuthService,
	             private fbuilder: FormBuilder ) {
		// User not load yet. maybe direct access.
		if ( !auth.loaded ) {
			this.userSubscription = userService.getCurrentUser()
			                                   .subscribe( user => {
				                                   auth.loaded = true;
				                                   auth.authorized = user.ID ? true : false;
				                                   userService.currentUser = user;
				                                   auth.authorized ? router.navigate( [''] ) : this.authCallback();
			                                   } );

			// User is loaded and will be checked auth
		} else {
			userService.currentUser.ID ? router.navigate( [''] ) : this.authCallback();
		}

		this.loginFormHandler = this.fbuilder.group( {
			"fname": ["", Validators.required],
			"passw": ["", Validators.required]
		} );
		this.registerFormHandler = this.fbuilder.group( {
			"login"  : ["", Validators.required],
			"passw"  : ["", Validators.required],
			"confirm": ["", Validators.required]
		} );
	}

	/**
	 * ==================== Login Action ======================
	 * 23.09.2016
	 */
	doLogin() {
		if ( this.loginFormHandler.status === "VALID" ) {
			this.spinner = true;
			this.userSubscription = this.auth.authorizeMe(this.loginFormHandler.value)
				.subscribe( data => {
					switch (data.message) {
						case 'success' :
							this.userService.currentUser = data.user;
							this.auth.loaded = true;
							this.auth.authorized = true;
							this.router.navigate( [''] );
							break;
						case 'notfound' :
							console.log( data );
							break;
						case 'notmatch' :
							console.log( data );
							break;
						default:
							console.log( 'something wrong' );
					}
					this.spinner = false;
				});
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
	}


	authCallback() {

	}

	ngOnDestroy() {
		this.userSubscription.unsubscribe();
	}


}