<?php
add_action( 'wp_enqueue_scripts', 'aa_func_20163119123146' );
function aa_func_20163119123146()
{
	wp_enqueue_style( 'template-base-styles', get_bloginfo( 'stylesheet_url' ) );
}