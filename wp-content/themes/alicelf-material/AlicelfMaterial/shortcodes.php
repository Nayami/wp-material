<?php

// ============= Preformatted =============
if ( ! function_exists( 'remove_br_from_shortcodes' ) ) {
	function remove_br_from_shortcodes( $atts = [], $content = null )
	{
		ob_start();
//		$shortcode_data = shortcode_atts( [
//			'params' => $atts[ 'params' ]
//		], $atts );
		echo str_replace(['<br>', '<br/>', '<br />', '<p>', '</p>'], '', do_shortcode($content));
		return ob_get_clean();
	}
}

add_action('wp_loaded', 'aa_func_20165319045319');
function aa_func_20165319045319()
{
	add_shortcode('remove_br_from_shortcodes', 'remove_br_from_shortcodes');
}