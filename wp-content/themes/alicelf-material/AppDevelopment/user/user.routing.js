"use strict";
var router_1 = require('@angular/router');
var notfound_component_1 = require("./user_components/notfound.component");
var network_component_1 = require("./user_components/network.component");
var auth_component_1 = require("./user_components/auth.component");
var restore_password_component_1 = require("./user_components/restore.password.component");
var edit_profile_component_1 = require("./user_components/subcomponents/edit.profile.component");
var appRoutes = [
    { path: '', component: network_component_1.NetworkComponent },
    { path: 'notfound', component: notfound_component_1.NotFoundComponent },
    { path: ':userslug', component: network_component_1.NetworkComponent },
    { path: ':userslug/edit', component: edit_profile_component_1.EditProfileComponent },
    { path: 'screen/auth', component: auth_component_1.AMAuthComponent },
    { path: 'screen/restorepass', component: restore_password_component_1.RestorePasswordComponent },
    { path: 'screen/restorepass/:tokenparams', component: restore_password_component_1.RestorePasswordComponent },
    { path: '**', component: notfound_component_1.NotFoundComponent }
];
exports.userRoutingProviders = [];
exports.userRouting = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=user.routing.js.map