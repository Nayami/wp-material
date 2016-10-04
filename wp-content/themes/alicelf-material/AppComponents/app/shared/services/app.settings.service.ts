import { Injectable } from '@angular/core';

declare var AMdefaults: any;

@Injectable()
export class AppSettingsService {

	public settings: any = AMdefaults;

	constructor() {}

}