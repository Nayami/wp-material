<?php
/**
 * ==================== Woo Options ======================
 * 19.08.2016
 */
if ( ! function_exists( '__woo_options' ) ) {
	function __woo_options()
	{
		return [
			'woocommerce_shop_page_id'         => get_option( 'woocommerce_shop_page_id' ),
			'woocommerce_cart_page_id'         => get_option( 'woocommerce_cart_page_id' ),
			'woocommerce_checkout_page_id'     => get_option( 'woocommerce_checkout_page_id' ),
			'woocommerce_pay_page_id'          => get_option( 'woocommerce_pay_page_id' ),
			'woocommerce_thanks_page_id'       => get_option( 'woocommerce_thanks_page_id' ),
			'woocommerce_myaccount_page_id'    => get_option( 'woocommerce_myaccount_page_id' ),
			'woocommerce_edit_address_page_id' => get_option( 'woocommerce_edit_address_page_id' ),
			'woocommerce_view_order_page_id'   => get_option( 'woocommerce_view_order_page_id' ),
			'woocommerce_terms_page_id'        => get_option( 'woocommerce_terms_page_id' ),
		];
	}
}

/**
 * ==================== Shop Title ======================
 * 19.08.2016
 */
add_action( 'wp_title', 'aa_func_20162619062655', 11, 1 );
function aa_func_20162619062655( $title )
{
	$woo_presets = __woo_options();
	if ( function_exists( 'is_shop' ) ) {
		if ( is_shop() ) {
			$title = get_the_title( $woo_presets[ 'woocommerce_shop_page_id' ] ) . " | " . get_bloginfo( 'name' );
		}
	}

	return $title;
}

/**
 * ==================== Minicart A2 root ======================
 * 12.11.2016
 */
//add_filter( 'walker_nav_menu_start_el', 'aa_func_20160912040959', 10, 4 );
function aa_func_20160912040959( $item_output, $item, $depth, $args )
{
	// am-minicart
	if ( is_plugin_active( 'woocommerce/woocommerce.php' ) ) {
		$woo_options = __woo_options();
		$cart_id     = $woo_options[ 'woocommerce_cart_page_id' ];
		if ( $cart_id === $item->object_id && in_array( 'am-minicart', $item->classes ) && ! is_admin() ) {
			$cls         = join( " ", $item->classes );
			$item_output = "<li id='minicart-menu-item-{$item->ID}' class='{$cls} minicart-menu-item'>";
			$item_output .= "<a class='mdl-navigation__link'>";
			$item_output .= "<AMinicartRoot></AMinicartRoot>";
			$item_output .= "</a>";
			$item_output .= "</li>";
		}
	}

	return $item_output;
}

// Remove Unnecesarry LI elem
//add_filter( 'AMenu_start_elem', 'aa_func_20162112052129', 10, 1 );
//add_filter( 'AMenu_end_elem', 'aa_func_20162112052129', 10, 1 );
function aa_func_20162112052129( $item )
{
	$woo_options = __woo_options();
	$cart_id     = $woo_options[ 'woocommerce_cart_page_id' ];
	if ( $cart_id === $item->object_id && in_array( 'am-minicart', $item->classes ) && ! is_admin() ) {
		$item = null;
	}

	return $item;
}