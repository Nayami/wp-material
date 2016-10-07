import { Component, OnInit, OnDestroy
	,trigger, state, style, transition, animate} from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';


import {AuthGlobalService} from "../../../shared/services/auth.service";
import {FlashNoticeService} from "../../../shared/services/alert.dialog.modal/flash.notices";
import {UserGlobalService} from "../../../shared/services/user.global.service";
import {LayoutDataService} from "../../../shared/services/layout.data.service";
import {GlobConfirmService} from "../../../shared/services/alert.dialog.modal/confirm.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/user/views/';


@Component( {
	selector   : 'am-single-profile',
	templateUrl: componentPath + 'profile.component.html',
	animations : [
		trigger( 'renderProfile', [
			state( 'in', style( { transform: 'translateY(0)', opacity: 1 } ) ),

			transition( 'void => *', [
				style( { transform: 'translateY(20%)', opacity: 0 } ),
				animate( '300ms ease' )
			] ),
			transition( '* => void', [
				animate( '300ms ease-out', style( { transform: 'translateY(20%)', opacity: 0 } ) )
			] )
		] )
	]
} )
export class SingleProfileComponent implements OnInit, OnDestroy {

	spinner: boolean = false;
	owner: boolean = false;
	routerParam: Subscription;
	logoutConfirmation: Subscription;

	currentUserSlug: string;

	scopeUser: any = {
		ID: null
	};

	constructor( private router: Router,
	             private auth: AuthGlobalService,
	             private activatedRoute: ActivatedRoute,
	             private flashes: FlashNoticeService,
	             private layoutData: LayoutDataService,
	             private confirmService: GlobConfirmService,
	             private userService: UserGlobalService ) {

	}

	ngOnInit(): void {
		this.routerParam = this.router.events.subscribe( event => {
			if ( event.constructor['name'] === 'NavigationEnd' ) {
				let mbslug = this.activatedRoute.params['value'],
				    slug   = "userslug" in mbslug ? mbslug.userslug : null;

				this.userService.getUser( slug )
				    .subscribe( result => {
					    if ( !result.ID && this.auth.authorized )
						    this.router.navigate( ['/notfound'] );

					    this.scopeUser = result;
					    this.currentUserSlug = slug;
					    if ( result.is_current_user )
						    this.owner = true;
				    } )
			}

		} );

		// Logout event watch
		this.logoutConfirmation =
			this.confirmService.confirmationChange
			    .subscribe( data => {
				    if ( data.id === this.confirmService.currentID ) {
					    if ( data.dialogAnswer ) {
						    this.logoutAction();
					    }
					    this.confirmService.unplugConfirmation();
				    }
			    } )

	}

	// Launch Confirm
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


	switchUser( user ) {
		let u = user.length > 0 ? user : null;
		if ( this.currentUserSlug !== u ) {
			this.scopeUser = { ID: null };
			setTimeout( ()=> {
				this.router.navigate( [user] );
			}, 50 );
		}
	}

	logoutAction() {
		this.spinner = true;
		this.userService.doLogout()
		    .subscribe( data => {
			    if ( data === "logout_confirmed" ) {
				    this.userService.currentUser = null;
				    this.auth.authorized = false;
				    this.router.navigate( ['/screen/auth'] )
			    }

			    this.flashes.attachNotifications( {
				    message : 'You are logged out.',
				    cssClass: 'mdl-color--blue-200 mdl-color-text--blue-900',
				    type    : 'dismissable',
			    } );

			    this.spinner = false;
		    } )
	}

	ngOnDestroy(): void {
		this.routerParam.unsubscribe();
		this.logoutConfirmation.unsubscribe();
	}

}