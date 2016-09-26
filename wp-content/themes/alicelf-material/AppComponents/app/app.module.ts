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
import { EnterEmailComponent } from "./user/user_components/enteremail.form.component";
import {RestorePasswordComponent} from "./user/user_components/restore.password.component";
import {FlashNotificationsComponent} from "./shared/components/notifications.component";

/**
 * ==================== COMPONENTS ======================
 * 26.09.2016
 */
const componentMaybeExists = [
	{ selector: 'footer-component', component: FooterComponent, childs: [] },
	{ selector: 'FlashNotificationsComponent', component: FlashNotificationsComponent, childs: [] },
	{
	selector: 'AMreviewShell', component: CommentsComponent, childs: [
		FormComponent,
		ListingCommentsComponent,
		ConfirmComponent,
		EdittCommentComponent
	]
},
	{
		selector: 'user-profile-component', component: UserComponent, childs: [
		NotFoundComponent,
		NetworkComponent,
		AMAuthComponent,
		EnterEmailComponent,
		RestorePasswordComponent
	]
	},
	// ADD THERE COMPONENTS
];
let totalBootstrap     = [],
    totalDelclarations = [];

for ( let it = componentMaybeExists.length; it--; ) {
	let amMdl = componentMaybeExists[it];
	if ( document.getElementsByTagName( amMdl.selector ).length > 0 ) {
		totalBootstrap.push( amMdl.component );
		totalDelclarations.push( amMdl.component );
		totalDelclarations = totalDelclarations.concat( amMdl.childs );
	}
}

/**
 * ==================== IMPORTS ======================
 * 26.09.2016
 */
let defaultImports = [
	BrowserModule,
	HttpModule,
	FormsModule,
	ReactiveFormsModule,
	SharedModule.forRoot(),
	UserModule,
	CommentsModule,
];
let newImports = [];
let availableRoutes = [
	{ selector: 'user-profile-component', route: userRouting },
	// ADD THERE ROUTING
];
for ( let lt = availableRoutes.length; lt--; ) {
	let amMdl = availableRoutes[lt];
	if ( document.getElementsByTagName( amMdl.selector ).length > 0 ) {
		newImports.push( amMdl.route );
	}
}

let totalimplode = defaultImports.concat( newImports );

@NgModule( {
	imports     : totalimplode,
	declarations: totalDelclarations,
	bootstrap   : totalBootstrap
} )


export class AppModule {
}