<?php
add_action( 'wp_enqueue_scripts', 'aa_func_20163119123146' );
function aa_func_20163119123146()
{
	$template_path = get_stylesheet_directory_uri();

	// Styles
	// GMaterial
	wp_enqueue_style( 'google-material-icons', "https://fonts.googleapis.com/icon?family=Material+Icons" );
	wp_enqueue_style( 'google-material-style', $template_path."/mdl/material.min.css" );
	wp_enqueue_style( 'template-base-styles', get_bloginfo( 'stylesheet_url' ) );


	// GMaterial
	wp_enqueue_script('google-material-script', $template_path. "/mdl/material.min.js", [], false, true);
	// Theme jQuery 2.1
	wp_deregister_script( 'jquery' );
	wp_register_script( 'jquery', $template_path . '/script/prod/jQuery2.1.js', [], '2.1', true );
	wp_enqueue_script( 'jquery' );

}