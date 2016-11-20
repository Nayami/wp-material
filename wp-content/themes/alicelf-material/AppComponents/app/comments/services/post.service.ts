import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

declare var AMdefaults: any;

@Injectable()
export class PostService {

	postId: number;
	post: any;
	type: string;

	constructor( private http: Http ) {
	}

	getPost(): Observable<any> {
		return this.http.get( AMdefaults.baseurl + "/wp-json/wp/v2/" + this.type + "s/" + this.postId )
			['map']( ( res: Response ) => res.json() );

	}

}