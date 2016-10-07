import { Component, OnInit } from '@angular/core';
import {LayoutDataService} from "../../shared/services/layout.data.service";

@Component( {
	template: `
		<div class="am-wrap">
			<br>
			<h1 class="text-center">.404 not found.</h1>
			<div class="mdl-grid">
				<div class="mdl-cell mdl-cell--12-col">
					Nothing found
				</div>
			</div>
		</div>
	`
} )

export class NotFoundComponent implements OnInit {

	constructor( private layoutData: LayoutDataService ) {
	}

	ngOnInit(): void {
		this.layoutData.invokeLoad();
	}

}