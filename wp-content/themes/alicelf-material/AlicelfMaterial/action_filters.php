<?php
use AlicelfMaterial\Helpers\AmDb;

/**
 * ==================== Deploy additional tables ======================
 */
add_action( 'after_switch_theme', 'aa_func_20161027071039' );
function aa_func_20161027071039()
{
	// text, varchar, int
	$fields = [
		[ 'hash', 'varchar' ],
		[ 'email', 'varchar' ],
		[ 'action', 'varchar' ], // reset or activation
		[ 'time', 'datetime' ]
	];
	AmDb::createTable( 'user_reset_passwords', $fields, true );
}

/**
 * ==================== WP Check Authentification ======================
 * 17.11.2016
 */
add_action('admin_init', 'aa_func_20165217065225');
function aa_func_20165217065225()
{
	global $_am;
	if($_am[ 'disable-regular-wplogin' ] === 'yes') {
		remove_action( 'admin_enqueue_scripts', 'wp_auth_check_load' );
	}
}

/**
 * ==================== Disable admin area for non admins ======================
 * 03.10.2016
 */
add_action( 'wp_loaded', 'aa_func_20165803055837' );
function aa_func_20165803055837()
{
	global $_am;
	if ( $_am[ 'disable-regular-wplogin' ] === 'yes' ) {
		$is_ajax = defined( 'DOING_AJAX' ) && DOING_AJAX;
		$gl      = $GLOBALS[ 'pagenow' ];
		$list    = [
			'wp-login.php'
		];
		if ( ( is_admin() || in_array( $gl, $list ) ) && ! $is_ajax ) {
			if ( ! is_super_admin( get_current_user_id() ) ) {
				wp_redirect( get_am_network_endpoint() );
				die;
			}
		}
	}
}

add_theme_support( 'post-thumbnails' );
add_filter( 'widget_text', 'do_shortcode' );
add_theme_support( 'woocommerce' );

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
 * Restict duplicate images with different sizes
 *
 * @param $sizes
 */
add_filter('intermediate_image_sizes_advanced', 'aa_func_20162612122629', 10, 1);
function aa_func_20162612122629($sizes)
{
	//	unset( $sizes[ 'thumbnail' ] );
	unset( $sizes[ 'medium' ] );
	unset( $sizes[ 'large' ] );

	return $sizes;
}

/**
 * ==================== Change Title Defaults ======================
 * 19.08.2016
 */
add_filter( 'wp_title', 'aa_func_20164019094058', 10, 1 );
function aa_func_20164019094058( $title )
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

add_action( 'admin_print_footer_scripts', 'aa_func_20164419044418' );
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
add_action( 'wp_head', 'aa_func_20163901013945', 30 );
function aa_func_20163901013945()
{
	global $_am;
	if ( ! empty( $_am[ 'opt-snippet-css' ] ) )
		echo "<style>{$_am['opt-snippet-css']}</style>";

	/**
	 * ==================== Page Custom Style ======================
	 * 16.10.2016
	 */
	$post_id = get_the_ID();
	if ( get_post_type( $post_id ) === 'page' ) {
		$pagestyle = get_post_meta( $post_id, 'page_custom_style', true );
		if ( ! empty( $pagestyle ) ) {
			echo "<style>";
			echo $pagestyle;
			echo "</style>";
		}
	}
}
/**
 * ==================== Page Custom Script ======================
 * 16.10.2016
 */
add_action('wp_footer', 'aa_func_20164416084407', 99);
function aa_func_20164416084407()
{
	$post_id = get_the_ID();
	if ( get_post_type( $post_id ) === 'page' ) {
		$pagestyle = get_post_meta( $post_id, 'page_custom_script', true );
		if ( ! empty( $pagestyle ) ) {
			echo "<script>";
			echo $pagestyle;
			echo "</script>";
		}
	}
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

add_action( 'admin_init', 'aa_func_20164902064936' );
function aa_func_20164902064936()
{
	add_meta_box(
		'am_network_endpoints',
		"Network Endpoints",
		'func_20160802070842',
		'nav-menus',
		'side',
		'low'
	);
}

// ============= Nav_menu_link =============
if ( ! function_exists( 'func_20160802070842' ) ) {
	function func_20160802070842()
	{
		$box_id       = "networks-endpoints-id";
		$net_endpoint = get_am_network_endpoint();
		?>
		<div id="<?php echo $box_id ?>" class="posttypediv">
			<div id="tabs-panel-wishlist-login" class="tabs-panel tabs-panel-active">
				<ul id="wishlist-login-checklist" class="categorychecklist form-no-clear">
					<li>
						<label class="menu-item-title">
							<input type="checkbox" name="menu-item[-1][menu-item-object-id]" value="-1">
							Network
						</label>
						<input type="hidden" name="menu-item[-1][menu-item-type]" value="custom">
						<input type="hidden" name="menu-item[-1][menu-item-object]" value="network_link">
						<input type="hidden" name="menu-item[-1][menu-item-title]" value="Network">
						<input type="hidden" name="menu-item[-1][menu-item-url]" value="<?php echo $net_endpoint ?>">
						<input type="hidden" name="menu-item[-1][menu-item-classes]" value="network-classes">
					</li>
				</ul>
			</div>
			<div class="button-controls">
				<span class="list-controls">
					<a href="<?php echo get_site_url() ?>/wp-admin/nav-menus.php?page-tab=all&amp;selectall=1#<?php echo $box_id ?>" class="select-all">Select All</a>
				</span>
				<span class="add-to-menu">
					<input type="submit" class="button-secondary submit-add-to-menu right" value="Add to Menu" name="add-post-type-menu-item" id="submit-<?php echo $box_id ?>"><span class="spinner"></span>
				</span>
			</div>
		</div>
		<?php
	}
}


/**
 * ==================== Page Options ======================
 * 12.11.2016
 */
add_action('aa_page_loop_start', 'aa_func_20163812013800', 10);
function aa_func_20163812013800()
{
	// define( 'WPCF7_AUTOP', false ); add this to wp-config
	// [remove_br_from_shortcodes]
	// [contact-form-7 id="701" title="Contact form 1"]
	// [/remove_br_from_shortcodes]

	if(get_field('remove_autoformat', get_the_ID())) {
		remove_filter( 'the_content', 'wpautop' );
		remove_filter( 'the_excerpt', 'wpautop' );
	}
}