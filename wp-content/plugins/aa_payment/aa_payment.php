<?php
/*
Plugin Name: AA Payment
Plugin URI: http://www.upwork.com/fl/olegtsibulnik
Description: AA Payment plugin - Upload and Activate. PHP version 5.4+ required
Author: Alicelf WebArtisan
Version: 1.0.1
Author URI: http://www.upwork.com/fl/olegtsibulnik
*/
session_start();
// Dependencies
require_once( 'AAPluginInitial.php' );
global $aa_payment;
$aa_payment = new AAPluginInitial( "AA Payment", null, null, null, 99 );
// Subpage
$aa_payment->addSubpage( 'Donation Forms' );

global $paypal_credentials;
$paypal_credentials = $aa_payment->getOptions( 'paypal_credentials' );

define( "AA_PP_SANDBOX", true );

include_once( 'vendor/autoload.php' );

// Wrap to wp_loaded for get user and set him notice
add_action( 'plugins_loaded', 'aa_func_20150406060442', 1 );
function aa_func_20150406060442()
{
	global $aa_payment;
	// Notice content. Can has hrefs or other html
	$aa_payment->setPluginNotice( 'aa_payment_welcome', "Plugin {$aa_payment->_plugin_name} is enabled" );

	$aa_payment->setOption( 'paypal_credentials', [ ] );
}

// Change Plugin title
add_filter( 'aa_payment_basetitle', 'aa_func_20150506060501', 10, 1 );
function aa_func_20150506060501( $title )
{
	$title .= " (payment gateway credentials)";

	return $title;
}

/**
 * Plugin page content
 */
add_action( 'aa_payment_content', 'aa_func_20150506060514' );
function aa_func_20150506060514()
{
	global $aa_payment;
	$paypal_credentials = $aa_payment->getOptions( 'paypal_credentials' );

	$paypal_form_fields = [
		[
			'id'    => 'paypal_email',
			'title' => 'Paypal Email',
			'type'  => 'email'
		],
		[
			'id'    => 'client_id',
			'title' => 'Client ID',
			'type'  => 'text'
		],
		[
			'id'    => 'client_secret',
			'title' => 'Client Secret',
			'type'  => 'text'
		],
	];

	?>
	<h3>PayPal Credentials</h3>
	<form action="" method="post" class="aa-pluginsloader-holder">
		<div class="clearfix">
			<table class="table table-striped table-bordered">
				<?php
				foreach ( apply_filters( 'paypal_form_fields', $paypal_form_fields ) as $value ):
					/**
					 * ==================== Regular Input ======================
					 * 21.08.2016
					 */
					if ( in_array( $value[ 'type' ], [ 'text', 'email', 'input' ] ) ) {
						$attributes = " type='{$value['type']}'";
						$attributes .= " name='{$value['id']}' id='{$value['id']}'";
						$attributes .= " placeholder='{$value['title']}'";
						$val = $paypal_credentials[ $value[ 'id' ] ];
						?>
						<tr>
							<th>
								<label for="<?php echo $value[ 'id' ] ?>"><?php echo $value[ 'title' ] ?></label>
							</th>
							<td>
								<input data-name="<?php echo $value['id'] ?>" value="<?php echo $val ?>" <?php echo $attributes ?> class="form-control">
							</td>
						</tr>
						<?php
					}
					/**
					 * ==================== Checkbox, Radio ======================
					 * 21.08.2016
					 */
					if ( in_array( $value[ 'type' ], [ 'checkbox', 'radio' ] ) ) {
						$attributes = " type='{$value['type']}'";
						$attributes .= " name='{$value['id']}[]'";
						$attributes .= " placeholder='{$value['title']}'";
						$val = $paypal_credentials[ $value[ 'id' ] ];

						?>
						<tr>
							<th>
								<label><?php echo $value[ 'title' ] ?></label>
							</th>
						<td>
						<?php
						foreach ( $value[ 'items' ] as $item ) {
							$checked = null;
							if($val && in_array($item[ 'value' ], $val))
								$checked ="checked='checked'";
							?>
							<input <?php echo $checked ?> data-name="<?php echo $value['id'] ?>" id="<?php echo $item[ 'label' ] ?>" value="<?php echo $item[ 'value' ] ?>" <?php echo $attributes ?> class="form-control">
							<label for="<?php echo $item[ 'label' ] ?>"><?php echo $item[ 'label' ] ?></label>
							<?php
						}
						?>
						</td>
						</tr>
						<?php

					}
					?>
				<?php endforeach; ?>
			</table>
		</div>
		<button id="paypal-credentials-submit" type="submit" class="button button-primary">Save Options</button>
	</form>
	<?php
}