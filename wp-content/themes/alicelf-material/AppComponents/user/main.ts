import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UserModule } from './user.module';
const platform = platformBrowserDynamic();

platform.bootstrapModule( UserModule )
	.then( success => console.log( `UserModule loaded` ) );
