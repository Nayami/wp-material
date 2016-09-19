<?php

// ============= Preformatted =============
if ( ! function_exists( 'preformatted' ) ) {
	function preformatted( $atts = [], $content = null )
	{
		ob_start();
		$atts['param'] = isset($atts[ 'param' ]) ? $atts[ 'param' ]: "HTML";
		$shortcode_data = shortcode_atts( [
			'param' => $atts[ 'param' ]
		], $atts );


		return ob_get_clean();
	}
}

add_action('wp_loaded', 'aa_func_20165319045319');
function aa_func_20165319045319()
{
	add_shortcode('preformatted', 'preformatted');
}