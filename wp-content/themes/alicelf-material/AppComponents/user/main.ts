import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { UserModule } from './user.module';

platformBrowserDynamic()
	.bootstrapModule( UserModule )
	.then( success => console.log( `UserModule loaded` ) );
