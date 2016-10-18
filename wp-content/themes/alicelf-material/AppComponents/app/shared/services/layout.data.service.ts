import { Injectable } from '@angular/core';

@Injectable()
export class LayoutDataService {

	layoutDataLoaded: boolean = false;

	constructor() {
		this.startLoading();
	}

	invokeLoad() {
		let elemJ = document.getElementsByClassName( 'load-rising-holder' ),
			loader = elemJ[0];
		if ( loader ) {
			let opacity = 1;
			let inter = setInterval( () => {
				if(loader !== undefined) {
					loader['style'].opacity = opacity;
				}
				opacity -= 0.05;
				if ( opacity <= 0 ) {
					clearInterval( inter );
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