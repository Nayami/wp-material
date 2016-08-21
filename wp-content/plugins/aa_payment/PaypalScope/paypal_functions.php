<?php

// ============= Paypal_credentials =============
if ( ! function_exists( 'paypal_credentials' ) ) {
	function paypal_credentials()
	{
		if ( function_exists( 'get_field' ) ) {
			$sandbox = get_field( 'sandbox', 'option' ) === 'true' ? true : false;

			return [
				'paypal_email'  => get_field( 'paypal_email', 'option' ),
				'client_id'     => get_field( 'client_id', 'option' ),
				'client_secret' => get_field( 'client_secret', 'option' ),
			];
		}

		return false;
	}
}

// ============= Paypal_pro_credentials =============
if ( ! function_exists( 'paypal_pro_credentials' ) ) {
	function paypal_pro_credentials()
	{
		if ( function_exists( 'get_field' ) ) {
			$sandbox = get_field( 'sandbox', 'option' ) === 'true' ? true : false;

			return [
				'sandbox'       => $sandbox,
				'api_version'   => '85.0',
				'api_endpoint'  => $sandbox ? 'https://api-3t.sandbox.paypal.com/nvp' : 'https://api-3t.paypal.com/nvp',
				'api_username'  => $sandbox ? get_field( 'api_username_sandbox', 'option' ) : get_field( 'api_username', 'option' ),
				'api_password'  => $sandbox ? get_field( 'api_password_sandbox', 'option' ) : get_field( 'api_password', 'option' ),
				'api_signature' => $sandbox ? get_field( 'api_signature_sandbox', 'option' ) : get_field( 'api_signature', 'option' ),
			];
		}

		return false;
	}
}