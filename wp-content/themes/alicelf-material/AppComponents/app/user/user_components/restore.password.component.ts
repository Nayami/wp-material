import { Component, OnInit, OnDestroy,
	trigger, state, style, transition, animate } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Rx';
import { UserGlobalService } from "../../shared/services/user.global.service";
import { AuthGlobalService } from "../../shared/services/auth.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/user/views/';

@Component( {
	templateUrl: componentPath + 'restore.password.html',
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
export class RestorePasswordComponent implements OnInit, OnDestroy {

	tokenInfo: any;
	private tokenSubscription: Subscription;

	constructor( private router: Router,
	             private auth: AuthGlobalService,
	             private userService: UserGlobalService ) {
		this.tokenSubscription = router.routerState.queryParams
		                               .subscribe( ( query: any ) => this.tokenInfo = query );
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		this.tokenSubscription.unsubscribe();
	}
}