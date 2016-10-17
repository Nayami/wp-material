import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { userRouting } from './user/user.routing';

// SHARED and GLOBS
import { SharedModule } from './shared/shared.module'; // user, auth, flash
import { FooterComponent } from './footer/footer.component';
import { FlashNotificationsComponent } from "./shared/components/notifications.component";

// NETWORK MODULE
import { UserModule } from "./user/user.module"; // * Module
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from "./user/user_components/notfound.component";
import { NetworkComponent } from "./user/user_components/network.component";
import { AMAuthComponent } from "./user/user_components/auth.component";
import { EnterEmailComponent } from "./user/user_components/enteremail.form.component";
import { RestorePasswordComponent } from "./user/user_components/restore.password.component";

// COMMENTS
import { CommentsModule } from "./comments/comments.module"; // * Module
import { CommentsComponent }  from './comments/comments.component';
import { FormComponent }  from './comments/comments_childs/Form.component';
import { ListingCommentsComponent }  from './comments/comments_childs/ListingComments.component';

import { EdittCommentComponent } from "./comments/comments_childs/editcomment.component";
import { SingleProfileComponent } from "./user/user_components/subcomponents/profile.component";
import { GlobConfirmComponent } from "./shared/components/confirm.component";
import { GlobLoaderComponent } from "./shared/components/loaders.component";
import {ModalDialogComponent} from "./shared/components/modal.component";


/**
 * ==================== COMPONENTS ======================
 * 26.09.2016
 */
const componentMaybeExists = [
	{ selector: 'footer-component', component: FooterComponent, childs: [] },
	{ selector: 'FlashNotificationsComponent', component: FlashNotificationsComponent, childs: [] },
	{ selector: 'GlobConfirmComponent', component: ModalDialogComponent, childs: [] },
	{ selector: 'GlobConfirmComponent', component: GlobConfirmComponent, childs: [] },
	{ selector: 'GlobLoaderComponent', component: GlobLoaderComponent, childs: [] },
	{
		selector: 'AMreviewShell', component: CommentsComponent, childs: [
		FormComponent,
		ListingCommentsComponent,
		EdittCommentComponent
	]
	},
	{
		selector: 'user-profile-component', component: UserComponent, childs: [
		NotFoundComponent,
		NetworkComponent,
		AMAuthComponent,
		EnterEmailComponent,
		RestorePasswordComponent,
		SingleProfileComponent
	]
	},
	// ADD THERE COMPONENTS
];
let totalBootstrap     = [],
    totalDelclarations = [];

componentMaybeExists.forEach( ( object, index ) => {
	if ( document.getElementsByTagName( object.selector ).length > 0 ) {
		totalBootstrap.push( object.component );
		totalDelclarations.push( object.component );
		totalDelclarations = totalDelclarations.concat( object.childs );
	}
} );

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

let newImports      = [],
    availableRoutes = [
	    { selector: 'user-profile-component', route: userRouting },
	    // ADD THERE ROUTING
    ];

availableRoutes.forEach( ( object, index ) => {
	if ( document.getElementsByTagName( object.selector ).length > 0 ) {
		newImports.push( object.route );
	}
} );

let totalImports = defaultImports.concat( newImports );

@NgModule( {
	imports     : totalImports,
	declarations: totalDelclarations,
	bootstrap   : totalBootstrap
} )

export class AppModule {
}