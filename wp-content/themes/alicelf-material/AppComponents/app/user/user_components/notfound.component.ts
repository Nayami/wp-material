import { Component, OnInit } from '@angular/core';
import {LayoutDataService} from "../../shared/services/layout.data.service";

@Component( {
	template: `
		<div class="am-wrap">
			<br>
			<h1 class="text-center">.404 not found.</h1>
			<div *ngIf="!layoutData.layoutDataLoaded" class="load-rising-holder">
				<div class="load">
				   <div class="dot"></div>
				   <div class="outline"><span></span></div>
				</div>
			</div>
			<hr>
		</div>
	`
} )

export class NotFoundComponent implements OnInit {

	constructor( private layoutData: LayoutDataService ) {
	}

	ngOnInit():void {
		this.layoutData.layoutDataLoaded = true;
	}
}