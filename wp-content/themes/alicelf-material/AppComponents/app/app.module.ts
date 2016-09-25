import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { userRouting } from './user/user.routing';

// SHARED SERVICES
import { SharedModule } from './shared/shared.module';

import { FooterComponent } from './footer/footer.component';

import { UserModule } from "./user/user.module"; // * Module
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from "./user/user_components/notfound.component";
import { NetworkComponent } from "./user/user_components/network.component";
import { AMAuthComponent } from "./user/user_components/auth.component";

import { CommentsModule } from "./comments/comments.module"; // * Module
import { CommentsComponent }  from './comments/comments.component';
import { FormComponent }  from './comments/comments_childs/Form.component';
import { ListingCommentsComponent }  from './comments/comments_childs/ListingComments.component';
import { ConfirmComponent } from "./comments/comments_childs/confirm.component";
import { EdittCommentComponent } from "./comments/comments_childs/editcomment.component";

const componentMaybeExists = [
	{ selector: 'AMreviewShell', component: CommentsComponent },
	{ selector: 'footer-component', component: FooterComponent },
	{ selector: 'user-profile-component', component: UserComponent },
];

let totalBootstrap = [];
for (let it = componentMaybeExists.length; it--;) {
	let amMdl = componentMaybeExists[it];
	if (document.getElementsByTagName(amMdl.selector).length > 0) {
		totalBootstrap.push(amMdl.component);
	}
}

let prepareImports = [
	BrowserModule,
	HttpModule,
	FormsModule,
	ReactiveFormsModule,
	SharedModule.forRoot(),
	UserModule,
	CommentsModule
];
let possibleImports = [];
let possibleRoutes = [
	{ selector: 'user-profile-component', route: userRouting },
];
for (let lt = possibleRoutes.length; lt--;) {
	let amMdl = possibleRoutes[lt];
	if (document.getElementsByTagName(amMdl.selector).length > 0) {
		possibleImports.push(amMdl.route);
	}
}
let totalimplode = prepareImports.concat(possibleImports);

@NgModule({
	imports: totalimplode,
	declarations: [
		FooterComponent,

		UserComponent, // user-profile-component
		NotFoundComponent,
		NetworkComponent,
		AMAuthComponent,

		CommentsComponent, // AMreviewShell
		FormComponent,
		ListingCommentsComponent,
		ConfirmComponent,
		EdittCommentComponent
	],
	bootstrap: totalBootstrap
})


export class AppModule { }