/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
	// map tells the System loader where to look for things
	var componetsPath = AMdefaults.themeurl + '/AppProduction/';
	var map = {
		'app'     : componetsPath + 'app',
		'comments': componetsPath + 'comments',
		'user'    : componetsPath + 'user',

		'@angular'                  : AMdefaults.themeurl + '/node_modules/@angular',
		'angular2-in-memory-web-api': AMdefaults.themeurl + '/node_modules/angular2-in-memory-web-api',
		'rxjs'                      : AMdefaults.themeurl + '/node_modules/rxjs'
	};
	// packages tells the System loader how to load when no filename and/or no extension
	var packages = {
		'app':      { main: 'main.js',  defaultExtension: 'js' },
		'comments': { main: 'main.js',  defaultExtension: 'js' },
		'user':     { main: 'main.js',  defaultExtension: 'js' },

		'rxjs':                       { defaultExtension: 'js' },
		'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
	};
	var ngPackageNames = [
		'common',
		'compiler',
		'core',
		'forms',
		'http',
		'platform-browser',
		'platform-browser-dynamic',
		'router',
		'router-deprecated',
		'upgrade',
	];
	// Individual files (~300 requests):
	function packIndex(pkgName) {
		packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
	}
	// Bundled (~40 requests):
	function packUmd(pkgName) {
		packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
	}
	// Most environments should use UMD; some (Karma) need the individual index files
	var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
	// Add package entries for angular packages
	ngPackageNames.forEach(setPackageConfig);
	var config = {
		map: map,
		packages: packages
	};
	System.config(config);
})(this);
