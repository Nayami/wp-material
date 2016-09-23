<?php

add_theme_support( 'post-thumbnails' );
add_filter( 'widget_text', 'do_shortcode' );
//add_theme_support( 'woocommerce' );

if ( ! current_user_can( 'manage_options' ) ) {
	show_admin_bar( false );
}

add_filter( 'wp_revisions_to_keep', 'custom_revisions_number', 10, 2 );
function custom_revisions_number( $num, $post )
{
	$num = 3;
	return $num;
}

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

add_action('admin_print_footer_scripts', 'aa_func_20164419044418');
function aa_func_20164419044418()
{
	if ( wp_script_is( 'quicktags' ) ) {
		?>
		<script type="text/javascript">
			QTags.addButton('ghostly_wrap', 'Wrap', '<div class="am-wrap">', '</div>', 'p', 'Wrap', 140);
		</script>
		<?php
	}
}

/**
 * ==================== Custom style ======================
 * 19.09.2016
 */
add_action('wp_head', 'aa_func_20163901013945', 30);
function aa_func_20163901013945()
{
	global $_am;
	if(!empty($_am['opt-snippet-css']))
		echo "<style>{$_am['opt-snippet-css']}</style>";
}
/**
 * ==================== JS after body tag ======================
 * 01.06.2016
 */
add_action( 'AM_afterbody_start', 'aa_func_20165314065329', 10 );
function aa_func_20165314065329()
{
	global $_am;
	if ( ! empty( $_am[ 'opt-snippet-js' ] ) )
		echo "<script>{$_am['opt-snippet-js']}</script>";
}