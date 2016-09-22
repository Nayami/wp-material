<?php
use AlicelfMaterial\Helpers\Helper;

// ============= Dd =============
if ( ! function_exists( 'dd' ) ) {
	function dd( $data )
	{
		echo "<pre>";
		Helper::dumpAndDie( $data );
		echo "</pre>";
	}
}

// ============= Material_logo =============
if ( ! function_exists( 'material_logo' ) ) {
	function material_logo()
	{
		global $_am;
		$output = null;
		$title  = get_bloginfo( 'name' ) . " | " . get_bloginfo( 'description' );
		if ( ! empty( $_am[ 'opt-logo' ] ) ) {
			$output .= "<a class='am-logo' href='" . get_site_url() . "'>";
			$output .= "<img src='{$_am['opt-logo']['url']}' title='{$title}' alt='site-logo'>";
			$output .= "</a>";
		} else {
			$output .= get_bloginfo( 'name' );
		}

		return $output;
	}
}

if ( ! function_exists( 'am_header_class' ) ) {
	function am_header_class()
	{
		global $_am;

		return $_am[ 'sticky-header' ] ? 'am-sticky-header' : 'non-sticky-header';

	}
}

// ============= Is_amuserpage =============
if ( ! function_exists( 'is_amuserpage' ) ) {
	function is_amuserpage()
	{
		global $wp_query;
		$isuser = $wp_query->query_vars[ am_profile_slug() ];

		return isset( $isuser );
	}
}