<?php
/**
 * ==================== Frontend Scripts ======================
 * 22.09.2016
 */
add_action( 'wp_enqueue_scripts', 'aa_func_20163119123146' );
function aa_func_20163119123146()
{
	$template_path = get_stylesheet_directory_uri();
	$nodesrc       = $template_path . "/node_modules/";
	$bowersrc      = $template_path . "/bower_components/";

	// Styles
	// GMaterial
	wp_enqueue_style( 'google-material-icons', "https://fonts.googleapis.com/icon?family=Material+Icons" );
	wp_enqueue_style( 'google-material-style', $template_path . "/mdl/mdl.css" );
	wp_enqueue_style( 'template-base-styles', get_bloginfo( 'stylesheet_url' ) );

	// GMaterial
	wp_enqueue_script( 'google-material-script', $template_path . "/mdl/material.min.js", [ ], false, true );
	// Theme jQuery 2.1
	wp_deregister_script( 'jquery' );
	wp_register_script( 'jquery', $template_path . '/script/prod/jQuery2.1.js', [ ], '2.1', true );
	wp_enqueue_script( 'jquery' );

	// Plugins
	if ( is_amuserpage() ) {
		wp_enqueue_style( 'cropperstyle', $bowersrc . "cropper/dist/cropper.min.css" );
		wp_enqueue_script( 'cropperscript', $bowersrc . "cropper/dist/cropper.min.js", [ 'jquery' ], false, true );
	}

	// DEV
	wp_enqueue_script( 'ngShim', $nodesrc . "core-js/client/shim.min.js", [ ], false, true );
	wp_enqueue_script( 'ngZone', $nodesrc . "zone.js/dist/zone.js", [ ], false, true );
	wp_enqueue_script( 'ngReflect', $nodesrc . "reflect-metadata/Reflect.js", [ ], false, true );
	wp_enqueue_script( 'ngSystem', $nodesrc . "systemjs/dist/system.src.js", [ ], false, true );
	wp_enqueue_script( 'systemConfig', $template_path . "/systemjs.config.js", [ ], false, true );

	// PRODUCTION
//	wp_enqueue_script( 'systemConfig', $template_path . "/AppProductionLive/angular2live.js", [ ], false, true );


	// Regular JS
	// @TODO: convert to production with gulp watcher
	wp_enqueue_script( 'AMscript', $template_path . "/script/dev/script.js", [ 'jquery' ], false, true );

}

/**
 * ==================== Admin Scripts ======================
 * 22.09.2016
 */
add_action( 'admin_enqueue_scripts', 'aa_func_20163220053219' );
function aa_func_20163220053219()
{
	$template_path = get_stylesheet_directory_uri();
	$cdnjs         = "https://cdnjs.cloudflare.com/ajax/libs/";
	// Font Awesome
	wp_enqueue_style( 'font-awesome', $cdnjs . 'font-awesome/4.6.3/css/font-awesome.min.css' );
	wp_enqueue_style( 'mdl-icons', "https://fonts.googleapis.com/icon?family=Material+Icons" );

	wp_enqueue_style( 'aa-backend-style', $template_path . "/style-parts/backend/init.css" );

	wp_enqueue_script( 'admin-jq-script', $template_path . "/style-parts/backend/script/admin-script.js", [ 'jquery' ], false, true );
}