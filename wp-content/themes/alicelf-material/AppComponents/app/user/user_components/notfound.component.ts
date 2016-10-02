import { Component, OnInit } from '@angular/core';

@Component( {
	template: `
		<div class="am-wrap">
			<br>
			<h1 class="text-center">.404 not found.</h1>
			<div class="load-rising-holder">
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
	constructor() {
	}

	ngOnInit() {
	}
}