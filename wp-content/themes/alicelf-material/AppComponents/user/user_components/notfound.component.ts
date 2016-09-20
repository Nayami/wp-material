import { Component, OnInit } from '@angular/core';

@Component( {
	template: `
		<div class="am-wrap">
			<br>
			<h1 class="text-center">.404 not found.</h1>
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