/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
	// map tells the System loader where to look for things
	var componentUrl = '/AppDevelopment/';
	var componetsPath = AMdefaults.themeurl + componentUrl;
	var map = {
		'app'     : componetsPath,

		'@angular'                  : AMdefaults.themeurl + '/node_modules/@angular',
		'angular2-in-memory-web-api': AMdefaults.themeurl + '/node_modules/angular2-in-memory-web-api',
		'rxjs'                      : AMdefaults.themeurl + '/node_modules/rxjs'
	};
	// packages tells the System loader how to load when no filename and/or no extension
	var packages = {
		'app':      {
			main: 'main',
			defaultExtension: 'js'
		},
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
	function packIndex(pkgName) {
		packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
	}
	function packUmd(pkgName) {
		packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
	}
	var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
	ngPackageNames.forEach(setPackageConfig);
	var config = {
		// defaultJSExtensions: true,
		map: map,
		packages: packages
	};
	System.config(config);
})(this);

System.import('app').catch(function(err) {
	console.error(err);
});