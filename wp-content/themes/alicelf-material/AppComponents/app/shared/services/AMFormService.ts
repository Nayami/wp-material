import { Injectable } from '@angular/core';

@Injectable()
export class AMFormService {

	constructor() {
	}

	static dataToPost( action: string, data: any ) {
		let formData = new FormData();
		formData.append( 'action', action );
		if ( Object.keys( data ).length > 0 ) {
			for ( var key in data ) {
				formData.append( key, data[key] );
			}
		}
		return formData;
	}


}