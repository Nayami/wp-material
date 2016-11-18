"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var user_routing_1 = require('./user/user.routing');
// SHARED and GLOBS
var shared_module_1 = require('./shared/shared.module'); // user, auth, flash
var footer_component_1 = require('./footer/footer.component');
var notifications_component_1 = require("./shared/components/notifications.component");
// NETWORK MODULE
var user_module_1 = require("./user/user.module"); // * Module
var user_component_1 = require('./user/user.component');
var notfound_component_1 = require("./user/user_components/notfound.component");
var network_component_1 = require("./user/user_components/network.component");
var auth_component_1 = require("./user/user_components/auth.component");
var enteremail_form_component_1 = require("./user/user_components/enteremail.form.component");
var restore_password_component_1 = require("./user/user_components/restore.password.component");
// COMMENTS
var comments_module_1 = require("./comments/comments.module"); // * Module
var comments_component_1 = require('./comments/comments.component');
var Form_component_1 = require('./comments/comments_childs/Form.component');
var ListingComments_component_1 = require('./comments/comments_childs/ListingComments.component');
var profile_component_1 = require("./user/user_components/subcomponents/profile.component");
var confirm_component_1 = require("./shared/components/confirm.component");
var loaders_component_1 = require("./shared/components/loaders.component");
var modal_component_1 = require("./shared/components/modal.component");
var changeAvatar_component_1 = require("./shared/components/modals/changeAvatar.component");
var edit_profile_component_1 = require("./user/user_components/subcomponents/edit.profile.component");
var minicart_component_1 = require("./woocommerce/minicart.component");
/**
 * ==================== COMPONENTS ======================
 */
var componentMaybeExists = [
    { selector: 'AMinicartRoot', component: minicart_component_1.WooComponent, childs: [] },
    { selector: 'FlashNotificationsComponent', component: notifications_component_1.FlashNotificationsComponent, childs: [] },
    { selector: 'GlobConfirmComponent', component: modal_component_1.ModalDialogComponent, childs: [
            changeAvatar_component_1.ChangeAvatarComponent,
        ] },
    { selector: 'GlobConfirmComponent', component: confirm_component_1.GlobConfirmComponent, childs: [] },
    { selector: 'GlobLoaderComponent', component: loaders_component_1.GlobLoaderComponent, childs: [] },
    {
        selector: 'AMreviewShell', component: comments_component_1.CommentsComponent, childs: [
            Form_component_1.FormComponent,
            ListingComments_component_1.ListingCommentsComponent,
        ]
    },
    {
        selector: 'user-profile-component', component: user_component_1.UserComponent, childs: [
            notfound_component_1.NotFoundComponent,
            network_component_1.NetworkComponent,
            auth_component_1.AMAuthComponent,
            enteremail_form_component_1.EnterEmailComponent,
            restore_password_component_1.RestorePasswordComponent,
            profile_component_1.SingleProfileComponent,
            edit_profile_component_1.EditProfileComponent
        ]
    },
    { selector: 'footer-component', component: footer_component_1.FooterComponent, childs: [] },
];
var totalBootstrap = [], totalDelclarations = [];
componentMaybeExists.forEach(function (object, index) {
    if (document.getElementsByTagName(object.selector).length > 0) {
        totalBootstrap.push(object.component);
        totalDelclarations.push(object.component);
        totalDelclarations = totalDelclarations.concat(object.childs);
    }
});
/**
 * ==================== IMPORTS ======================
 * 26.09.2016
 */
var defaultImports = [
    platform_browser_1.BrowserModule,
    http_1.HttpModule,
    forms_1.FormsModule,
    forms_1.ReactiveFormsModule,
    shared_module_1.SharedModule.forRoot(),
    user_module_1.UserModule,
    comments_module_1.CommentsModule,
];
var newImports = [], availableRoutes = [
    { selector: 'user-profile-component', route: user_routing_1.userRouting },
];
availableRoutes.forEach(function (object, index) {
    if (document.getElementsByTagName(object.selector).length > 0) {
        newImports.push(object.route);
    }
});
var totalImports = defaultImports.concat(newImports);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: totalImports,
            declarations: totalDelclarations,
            bootstrap: totalBootstrap
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map