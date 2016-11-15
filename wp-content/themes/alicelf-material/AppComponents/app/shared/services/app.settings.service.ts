import { Injectable } from '@angular/core';

declare var AMdefaults: any;
declare var $ : any;

@Injectable()
export class AppSettingsService {

	public settings: any = AMdefaults;
	public $JQ: any = $;

	constructor() {}

}