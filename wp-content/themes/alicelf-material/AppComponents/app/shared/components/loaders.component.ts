import { Component, OnInit } from '@angular/core';
import {LayoutDataService} from "../services/layout.data.service";

@Component( {
	selector: 'GlobLoaderComponent',
	template: `
		<div *ngIf="!layoutData.layoutDataLoaded" class="load-rising-holder">
			<div class="load">
				<div class="dot"></div>
				<div class="outline"><span></span></div>
			</div>
		</div>
	`
} )
export class GlobLoaderComponent implements OnInit {
	constructor(private layoutData : LayoutDataService) {
	}

	ngOnInit() {
	}
}