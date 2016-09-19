<?php
/**
 * ==================== User Profile endpoint ======================
 * 24.08.2016
 */
if ( ! function_exists( 'am_profile_slug' ) ) {
	function am_profile_slug()
	{
		return "~user~";
	}
}

add_action('wp_loaded', 'aa_func_20162801112818');
function aa_func_20162801112818()
{
	add_rewrite_endpoint( am_profile_slug(), EP_ALL | EP_PAGES );
}

add_action('template_redirect', 'aa_func_20162701112749');
function aa_func_20162701112749()
{
	global $wp_query;
	// if this is not a request for json or a singular object then bail
	if ( ! isset( $wp_query->query_vars[am_profile_slug()] ) )
		return;

	$viewed_user_name = $wp_query->query_vars[am_profile_slug()];


	include locate_template('AlicelfMaterial/user/views/profile.php');
	exit;
}