import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component( {
	template : `
		<div class="am-wrap">
			<br>
			<h1 class="text-center">Profile Component</h1>
			<hr>
		</div>
	`
} )
export class ProfileComponent implements OnInit {


	constructor(private userService: UserService) {
	}

	ngOnInit() {

	}
}