import { Injectable } from '@angular/core';

@Injectable()
export class LayoutDataService {

	layoutDataLoaded: boolean = false;

	constructor() {
	}

	invokeLoad() {
		let elemJ = document.getElementsByClassName( 'load-rising-holder' );
		if ( elemJ ) {
			let opacity = 1;
			let inter = setInterval( () => {
				elemJ[0]['style'].opacity = opacity;
				opacity -= 0.05;
				if ( opacity <= 0 ) {
					clearInterval( inter );
					console.log( "layout loaded" );
					this.layoutDataLoaded = true;
				}
			}, 50 );
		} else {
			this.layoutDataLoaded = true;
		}
	}

}