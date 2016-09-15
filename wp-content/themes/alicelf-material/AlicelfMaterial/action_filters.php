<?php

add_theme_support( 'post-thumbnails' );
add_filter( 'widget_text', 'do_shortcode' );

//add_theme_support( 'woocommerce' );


/**
 * ==================== Change Title Defaults ======================
 * 19.08.2016
 */
add_filter('wp_title', 'aa_func_20164019094058', 10, 1);
function aa_func_20164019094058($title)
{
	if ( is_home() || is_front_page() ) {
		$title = get_bloginfo( 'name' ) . " | " . get_bloginfo( 'description', 'display' );
	} else if ( is_404() ) {
		$title = get_bloginfo( 'name' ) . ' | .404!';
	} else if ( is_search() ) {
		$title = get_bloginfo( 'name' ) . " | Search " . get_search_query();
	} else {
		$title = get_the_title() . " | " . get_bloginfo( 'name' );
	}

	return $title;
}
