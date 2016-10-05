import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";

import {AuthGlobalService} from "../../../shared/services/auth.service";
import {FlashNoticeService} from "../../../shared/services/alert.dialog.modal/flash.notices";
import {UserGlobalService} from "../../../shared/services/user.global.service";

@Component( {
	selector: 'am-single-profile',
	template: `

	<div *ngIf="auth.loaded">
		<h1 class="text-center">@username</h1>

		<a [routerLink]="['/']">User</a>
		<a [routerLink]="['/user1']">User1</a>
		<a [routerLink]="['/b03c1180ab688532bc3e2a808ed71fe650c083b0']">alicelfdevgmailcom</a>
		<a [routerLink]="['/user3']">User3</a>

		<div class="relative-container mdl-grid">
			<div class="mdl-spinner mdl-js-spinner login-spinner-handler" [ngClass]="{'is-active': spinner}"></div>
		</div>
		<div class="content-grid">
			<div class="mdl-grid">
				<figure class="mdl-cell mdl-cell--2-col">
					<img [src]="userService.currentUser.network_meta.user_media.avatar_url" alt="">
				</figure>
				<div class="mdl-cell mdl-cell--10-col relative-container">
					{{userService.currentUser | json}}

					<div *ngIf="userService.currentUser" class="corner-logout-button">
						<i (click)="invokeLogout()" class="material-icons">exit_to_app</i>
					</div>

				</div>
			</div>
		</div>
	</div>
	`
} )
export class SingleProfileComponent implements OnInit {

	@Input() renderedUser;

	spinner : boolean = false;
	owner : boolean = false;

	constructor(private router: Router,
	            private auth: AuthGlobalService,
	            private flashes: FlashNoticeService,
	            private userService: UserGlobalService ) {
	}

	ngOnInit(): void {

	}

	invokeLogout() {
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

	ngOnChanges(changes:SimpleChanges) {

		if(changes['renderedUser'].currentValue ) {
			let slug = changes['renderedUser'].currentValue;
			this.owner = false;
			// @TODO: get user by slug and compare slugs with cureent logged in user (in ajax)
			// should be another object
		} else {
			this.owner = true;
		}
	}

}