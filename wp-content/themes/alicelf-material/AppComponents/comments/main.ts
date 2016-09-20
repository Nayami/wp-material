import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CommentsModule } from './comments.module';

platformBrowserDynamic()
	.bootstrapModule( CommentsModule )
	.then( success => console.log( `CommentsModule loaded` ) );