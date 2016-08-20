<?php

// ============= Paypal_donations_form =============
if ( ! function_exists( 'paypal_donations_form' ) ) {
	function paypal_donations_form()
	{
		ob_start();
		global $aa_payment;
		// $aa_payment->get_images_dir_url()
		?>
		<form action="" method="POST" autocomplete="off">
			<input type="hidden" name="paypal_checkout_20164820054847" value="checkout"/>

			<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
				<input class="mdl-textfield__input" name="donation-name" type="text" id="donation-name">
				<label class="mdl-textfield__label" for="donation-name">Donation Name</label>
			</div>

			<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
				<input class="mdl-textfield__input" name="donation-price" type="text" id="price-name">
				<label class="mdl-textfield__label" for="price-name">Price</label>
			</div>
			<hr>

			<button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
				Button
			</button>
		</form>
		<?php
		return ob_get_clean();
	}
}




/**
 * ==================== Shortcodes definition ======================
 * 21.07.2016
 */
add_action('wp_loaded', 'aa_func_20163321033351');
function aa_func_20163321033351()
{
	add_shortcode( 'paypal_donations_form', 'paypal_donations_form' );
}