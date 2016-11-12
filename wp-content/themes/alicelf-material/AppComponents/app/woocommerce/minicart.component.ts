import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

import {CartService} from "../shared/services/woocommerce/cart.service";

declare var AMdefaults: any;
var componentPath = AMdefaults.themeurl + '/AppComponents/app/comments/';

@Component( {
	selector: 'AMinicartRoot',
	template: ``
} )
export class WooComponent implements OnInit, OnDestroy {

	productsSubscription: Subscription;

	constructor( private cartService: CartService ) {
	}

	ngOnInit() {
		this.productsSubscription =
			this.cartService.GetProducts()
			    .subscribe( data => {
				    if ( data.length > 0 ) {
					    this.cartService.products = data;
					    this.cartService.cartEmpty = false;
				    }
			    } );
	}

	ngOnDestroy(): void {
		if ( this.productsSubscription !== undefined ) {
			this.productsSubscription.unsubscribe();
		}
	}
}