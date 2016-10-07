import { Injectable } from '@angular/core';

@Injectable()
export class LayoutDataService {

	layoutDataLoaded: boolean = false;

	constructor() {
		this.startLoading();
	}

	invokeLoad() {
		let elemJ = document.getElementsByClassName( 'load-rising-holder' );
		if ( elemJ[0] ) {
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

	startLoading(){
		this.layoutDataLoaded = false;
	}

}