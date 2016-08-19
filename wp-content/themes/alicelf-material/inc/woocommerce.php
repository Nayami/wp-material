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