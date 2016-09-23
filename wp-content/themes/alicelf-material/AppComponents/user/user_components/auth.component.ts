import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/user/views/';

@Component( {
	templateUrl: componentPath + 'auth.login.register.html',
	animations : [
		trigger('renderAuthTrigger',[
			state( 'in', style( { transform: 'translateY(0)', opacity: 1 } ) ),

			transition( 'void => *', [
				style( { transform: 'translateY(20%)', opacity: 0 } ),
				animate( '300ms ease' )
			] ),
			transition( '* => void', [
				animate( '300ms ease-out', style( { transform: 'translateY(-20%)', opacity: 0 } ) )
			] )
		])
	]
} )

export class AMAuthComponent implements OnInit {

	private renderAuthLayout: boolean = false;
	private loginFormHandler: FormGroup;
	private registerFormHandler: FormGroup;

	constructor( private router: Router,
	             private userService: UserService,
	             private fbuilder: FormBuilder ) {
		// User not load yet. maybe direct access.
		if ( !userService.currentUser.loaded ) {
			userService.getCurrentUser()
			           .subscribe( user => {
				           user.loaded = true;
				           userService.currentUser = user;
				           userService.currentUser.ID ? router.navigate( [''] ) : this.renderAuth();
			           } );

			// User is loaded and will be checked auth
		} else {
			userService.currentUser.ID ? router.navigate( [''] ) : this.renderAuth();
		}
	}

	/**
	 * ==================== Login Action ======================
	 * 23.09.2016
	 */
	doLogin() {
		if ( this.loginFormHandler.status === "VALID" ) {

		}
	}

	/**
	 * ==================== Registration Action ======================
	 * 23.09.2016
	 */
	doRegister(){

	}

	ngOnInit() {
	}

	renderAuth() {
		this.loginFormHandler = this.fbuilder.group( {
			"fname": [ "", Validators.required ],
			"passw": [ "", Validators.required ]
		} );
		this.registerFormHandler = this.fbuilder.group( {
			"login"  : [ "", Validators.required ],
			"passw"  : [ "", Validators.required ],
			"confirm": [ "", Validators.required ]
		} );

		this.renderAuthLayout = true;
	}

}