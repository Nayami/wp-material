import { Component, OnInit, OnDestroy
	,trigger, state, style, transition, animate} from '@angular/core';
import {LayoutDataService} from "../../shared/services/layout.data.service";
import { Router,ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthGlobalService } from "../../shared/services/auth.service";
import { FlashNoticeService } from "../../shared/services/alert.dialog.modal/flash.notices";
import { AppSettingsService } from "../../shared/services/app.settings.service";
import { ModalService } from "../../shared/services/alert.dialog.modal/modal.service";
import { GlobConfirmService } from "../../shared/services/alert.dialog.modal/confirm.service";
import { UserGlobalService } from "../../shared/services/user.global.service";
import {AMAuthComponent} from "./auth.component";
import {AMFormService} from "../../shared/services/AMFormService";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/user/views/';

@Component( {
	templateUrl: componentPath + 'profile.edit.component.html',
	animations : [
		trigger( 'renderEditProfile', [
			transition( 'void => *', [
				style( { transform: 'translateY(40%)', opacity: 0 } ),
				animate( '300ms ease-in', style( { transform: 'translateY(0)', opacity: 1 } ) )
			] ),
			transition( '* => void', [
				style( { transform: 'translateY(0)', opacity: 1 } ),
				animate( '300ms ease-in', style( { transform: 'translateY(40%)', opacity: 0 } ) )
			] )
		] )
	],
} )
export class EditProfileComponent implements OnInit, OnDestroy {

	spinner: boolean = false;
	owner: boolean = false;
	routerParam: Subscription;
	logoutConfirmation: Subscription;
	private editFormHandler: FormGroup;

	scopeUser: any = {
		ID: null
	};


	constructor( private layoutData: LayoutDataService,
	             private router: Router,
	             private http: Http,
	             private auth: AuthGlobalService,
	             private activatedRoute: ActivatedRoute,
	             private flashes: FlashNoticeService,
	             private appSettings: AppSettingsService,
	             private modal: ModalService,
	             private confirmService: GlobConfirmService,
	             private userService: UserGlobalService,
	             private fbuilder: FormBuilder ) {
	}

	ngOnInit() {
		this.spinner = true;
		this.layoutData.invokeLoad();

		this.routerParam = this.router.events.subscribe( event => {
			if ( event.constructor['name'] === 'NavigationEnd' ) {
				let mbslug = this.activatedRoute.params['value'],
				    slug   = "userslug" in mbslug ? mbslug.userslug : null;

				this.userService.getUser( slug )
				    .subscribe( result => {
					    if ( !result.ID && this.auth.authorized )
						    this.router.navigate( ['/notfound'] );

					    this.scopeUser = result;
					    if ( result.is_current_user ) {
						    this.loadEditForm( result );
						    this.owner = true;
					    } else {
						    this.router.navigate( ['/'] );
					    }
					    this.spinner = false;
				    } )
			}
		} );
		// @ACTION : Logout event watch
		this.logoutConfirmation =
			this.confirmService.confirmationChange
			    .subscribe( data => {
				    if ( data.id === this.confirmService.currentID ) {
					    if ( data.dialogAnswer ) {
						    this.logoutAction();
					    }
					    this.confirmService.unplugConfirmation();
				    }
			    } );
	}

	// @ACTION : Logout event invoke
	askLogoutConfirm() {
		let stamp = new Date().getTime();
		this.confirmService.currentID = stamp;
		this.confirmService.launchConfirm( {
			id           : stamp,
			dialogClass  : 'danger-alert',
			dialogMessage: 'Are you sure want to logout?',
			dialogAnswer : null,
			showButtons  : true
		} )
	}

	logoutAction() {
		this.spinner = true;
		this.userService.doLogout()
		    .subscribe( data => {
			    if ( data === "logout_confirmed" ) {
				    this.userService.currentUser = null;
				    this.auth.authorized = false;
				    this.router.navigate( ['/screen/auth'] );
			    }

			    this.flashes.attachNotifications( {
				    message : 'You are logged out.',
				    cssClass: 'mdl-color--blue-200 mdl-color-text--blue-900',
				    type    : 'dismissable',
			    } );

			    this.spinner = false;
		    } )
	}

	loadEditForm( user ) {
		this.editFormHandler = this.fbuilder.group( {
			email  : [user.user_email, [AMAuthComponent.authEmailValidation]],
			slug   : [user.slug, [Validators.required, Validators.minLength( 5 )]],
			pass   : ["", [Validators.required, Validators.minLength( 5 )]],
			confirm: ["", [Validators.required, Validators.minLength( 5 )]],
		} );
	}

	changeProfileSettings() {
		if ( this.editFormHandler.status === "VALID" ) {
			// @TODO: Check pass confirmation
			const body = AMFormService.dataToPost( "ajx20163519013508", this.editFormHandler.value );
			this.http.post( AMdefaults.ajaxurl, body )['map']
			( ( response: Response ) => response.json() )
				.subscribe( data => {

					console.log( data );

					if ( data.status === 'success' ) {
						this.scopeUser = data.user_data;
						this.userService.currentUser = data.user_data;
						this.router.navigate( ['/' + this.scopeUser.slug] );
					} else {
						// @TODO: handle server response errors
					}
				} )
		} else {
			// @TODO: Handle Errors
		}
	}

	ngOnDestroy(): void {
		this.routerParam.unsubscribe();
		this.logoutConfirmation.unsubscribe();
	}
}