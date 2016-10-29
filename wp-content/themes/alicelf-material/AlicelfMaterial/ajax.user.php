<?php
use AlicelfMaterial\Helpers\AmAttachment;
/**
 * ================================================
 * ==================== USER ======================
 * ================================================
 */
add_action( 'wp_ajax_nopriv_ajx20163917023918', 'ajx20163917023918' );
add_action( 'wp_ajax_ajx20163917023918', 'ajx20163917023918' );
function ajx20163917023918()
{
	$ret_user = [
		'ID'        => null,
		'logged_in' => false
	];

	if ( isset( $_GET[ 'by_slug' ] ) ) {
		global $wpdb;
		$query_result = $wpdb->get_row( "SELECT user_id FROM {$wpdb->usermeta}
														WHERE meta_key='am_slug' AND meta_value='{$_GET['by_slug']}'" );
		if ( $query_result ) {
			$ret_user = am_user( $query_result->user_id );
		}
	} else {
		if ( is_user_logged_in() ) {
			$user     = wp_get_current_user();
			$ret_user = am_user( $user->ID );
		}
	}

	echo json_encode( $ret_user );
	die;
}

/**
 * ==================== AUTH ======================
 * Login Action
 * 24.09.2016
 */
add_action( 'wp_ajax_nopriv_ajx20162924062955', 'ajx20162924062955' );
add_action( 'wp_ajax_ajx20162924062955', 'ajx20162924062955' );
function ajx20162924062955()
{
	$data     = $_POST;
	$login    = $data[ 'fname' ];
	$response = [
		'message' => null
	];
	$user     = get_user_by( 'login', $login );

	if ( ! $user ) {
		$response[ 'message' ] = 'notfound';
		echo json_encode( $response );
		die;
	}
	if ( $user && wp_check_password( $data[ 'passw' ], $user->data->user_pass, $user->ID ) ) {
		wp_set_auth_cookie( $user->ID );

		$filtered_user         = am_user( $user->ID );
		$response[ 'user' ]    = $filtered_user;
		$response[ 'message' ] = 'success';
		echo json_encode( $response );
		die;
	} else {
		$response[ 'message' ] = 'notmatch';
		echo json_encode( $response );
		die;
	}

}

/**
 * ==================== REMIND PASS REQUEST ======================
 * 28.09.2016
 */
add_action( 'wp_ajax_nopriv_ajx20165728055701', 'ajx20165728055701' );
add_action( 'wp_ajax_ajx20165728055701', 'ajx20165728055701' );
function ajx20165728055701()
{
	$data    = $_POST;
	$email   = $data[ 'email' ];
	$ret_val = [
		'email'  => $email,
		'status' => 'fail',
		'reason' => null
	];

	if ( ! get_user_by( 'email', $email ) ) {
		$ret_val[ 'status' ] = 'notfound';
		echo json_encode( $ret_val );
		die;
	}

	$token = send_me_confirmation_registration_link( $email, 'reset' );

	if ( $token ) {
		global $wpdb;
		$table = $wpdb->prefix . "user_reset_passwords";
		$wpdb->insert( $table, [
			'hash'   => $token,
			'email'  => $email,
			'action' => $data[ 'actionType' ],
			'time'   => date( 'Y-m-d H:i:s' )
		], [ '%s', '%s', '%s', '%s' ] );
		$ret_val[ 'status' ] = 'success';
	}

	echo json_encode( $ret_val );
	die;
}

/**
 * ==================== UPDATE PASS ======================
 * 28.09.2016
 */
add_action( 'wp_ajax_nopriv_ajx20160928110922', 'ajx20160928110922' );
add_action( 'wp_ajax_ajx20160928110922', 'ajx20160928110922' );
function ajx20160928110922()
{
	global $wpdb;
	$table        = $wpdb->prefix . "user_reset_passwords";
	$data         = str_replace( '\\', '', $_POST[ 'body_data' ] );
	$decoded_data = json_decode( $data );
	$newpassword  = $decoded_data->newpass;
	$ret_val      = [
		'status' => 'fail',
		'email'  => $decoded_data->email,
		'user'   => null
	];
	$reset_data   = $wpdb->get_row( "SELECT hash, email, action, time
																		FROM {$table}
																		WHERE hash='{$decoded_data->hash}'" );

	if ( $reset_data ) {
		$user = get_user_by( 'email', $decoded_data->email );
		if ( $user ) {
			wp_set_password( $newpassword, $user->ID );
			wp_set_auth_cookie( $user->ID );
			$ret_val[ 'user' ]   = am_user( $user->ID );
			$ret_val[ 'status' ] = 'success';
			$wpdb->delete( $table, [ 'email' => $decoded_data->email ], [ '%s' ] );
		}
	}

	echo json_encode( $ret_val );
	die;
}

/**
 * ==================== REGISTRATION FLOW ======================
 * 29.09.2016
 */
add_action( 'wp_ajax_nopriv_ajx20162929092956', 'ajx20162929092956' );
add_action( 'wp_ajax_ajx20162929092956', 'ajx20162929092956' );
function ajx20162929092956()
{
	global $wpdb, $_am;
	$strategy             = $_am[ 'network-confirmation-flow' ]; // confirm_before confirm_after no_confirm
	$registration_allowed = $_am[ 'network-registration' ];
	$table                = $wpdb->prefix . "user_reset_passwords";
	$data                 = $_POST;
	$response_data        = [
		'status'     => 'failed',
		'user'       => null,
		'check_mail' => null
	];
	if ( $registration_allowed === 'yes' ) {
		$check_user = get_user_by( 'email', $data[ 'login' ] );

		if ( $check_user ) {
			$response_data[ 'status' ] = 'user_exists';
			echo json_encode( $response_data );
			die;
		}

		/**
		 * For 'confirm_before' registration type, we just sending email
		 * After this confirmation, next step is hash exists ajx20161128111129
		 */
		if ( $strategy === 'confirm_before' ) {
			$token = send_me_confirmation_registration_link( $data[ 'login' ], 'confirm' );
			if ( $token ) {
				$wpdb->insert( $table, [
					'hash'   => $token,
					'email'  => $data[ 'login' ],
					'action' => 'confirm',
					'time'   => date( 'Y-m-d H:i:s' )
				], [ '%s', '%s', '%s', '%s' ] );
				$response_data[ 'check_mail' ] = true;
				$response_data[ 'status' ]     = 'success';
			} else {
				$response_data[ 'status' ] = 'email_fail';
			}

		} else {
			$userdata = [
				'user_login' => $data[ 'login' ],
				'user_email' => $data[ 'login' ],
				'user_pass'  => $data[ 'passw' ]
			];
			wp_insert_user( $userdata );

			$user = get_user_by( 'email', $data[ 'login' ] );
			update_user_meta( $user->ID, 'am_email_confirmed', 'not_confirmed' );
			$response_data[ 'user' ] = am_user( $user->ID );
			update_user_meta( $user->ID, 'am_slug', sha1( $user->data->user_email . uniqid() ) );

			if ( $strategy === 'confirm_after' ) {
				$token = send_me_confirmation_registration_link( $data[ 'login' ], 'confirm' );
				if ( $token ) {
					$wpdb->insert( $table, [
						'hash'   => $token,
						'email'  => $data[ 'login' ],
						'action' => 'confirm',
						'time'   => date( 'Y-m-d H:i:s' )
					], [ '%s', '%s', '%s', '%s' ] );
					$response_data[ 'check_mail' ] = true;
				}
			}
			$response_data[ 'status' ] = 'success';
			wp_set_auth_cookie( $user->ID );
		}

	}
	echo json_encode( $response_data );
	die;
}

/**
 * ==================== HASH IS EXISTS ======================
 * 28.09.2016
 */
add_action( 'wp_ajax_nopriv_ajx20161128111129', 'ajx20161128111129' );
add_action( 'wp_ajax_ajx20161128111129', 'ajx20161128111129' );
function ajx20161128111129()
{
	global $wpdb, $_am;
	$response = [
		'reset_confirm_data' => false,
		'next_step'          => null,
		'user'               => null,
		'message'            => null
	];

	$table        = $wpdb->prefix . "user_reset_passwords";
	$data         = str_replace( '\\', '', $_POST[ 'body_data' ] );
	$decoded_data = json_decode( $data );
	$reset_data   = $wpdb->get_row( "SELECT hash, email, action, time FROM {$table}
																		WHERE hash='{$decoded_data->token}' AND email='{$decoded_data->email}'" );

	if ( $reset_data ) {
		$response [ 'reset_confirm_data' ] = $reset_data;
		$check_user                        = get_user_by( 'email', $decoded_data->email );

		// Start confirmation
		if ( $reset_data->action === 'confirm' ) {
			if ( $_am[ 'network-confirmation-flow' ] === 'confirm_before' ) {

				if ( $check_user ) {
					$response[ 'user' ] = am_user( $check_user->ID );

					$wpdb->delete( $table, [ 'email' => $decoded_data->email ], [ '%s' ] );
					update_user_meta( $check_user->ID, 'am_email_confirmed', 'confirmed' );
					wp_set_auth_cookie( $check_user->ID );
					$response[ 'next_step' ] = 'authentificate';

				} else {
					/**
					 * This means user is not exist, but he is confirmed his email
					 * We have to create this user with random password
					 */
					$password         = wp_generate_password( 20, false );
					$mail_text        = "We generated random password for you. The password can be changed in your dashboard";
					$prepare_new_user = [
						'user_login' => $decoded_data->email,
						'user_email' => $decoded_data->email,
						'user_pass'  => $password
					];
					wp_insert_user( $prepare_new_user );

					$created_new_user = get_user_by( 'email', $decoded_data->email );
					update_user_meta( $created_new_user->ID, 'am_email_confirmed', 'confirmed' );
					update_user_meta( $created_new_user->ID, 'am_slug', sha1( $created_new_user->data->user_email . uniqid() ) );

					$response[ 'user' ] = am_user( $created_new_user->ID );
					wp_set_auth_cookie( $created_new_user->ID );
					$wpdb->delete( $table, [ 'email' => $decoded_data->email ], [ '%s' ] );

					$headers = "From: " . get_option( 'admin_email' ) . "\r\n";
					wp_mail( $decoded_data->email, 'Welcome!', $mail_text . ' Your Password: ' . $password, $headers );

					$response[ 'next_step' ] = 'authentificate';
					$response[ 'message' ]   = $mail_text;
				}
			}
			if ( $_am[ 'network-confirmation-flow' ] === 'confirm_after' ) {
				if ( $check_user ) {
					$response[ 'user' ]      = am_user( $check_user->ID );
					$response[ 'next_step' ] = 'authentificate';
					$wpdb->delete( $table, [ 'email' => $decoded_data->email ], [ '%s' ] );
					update_user_meta( $check_user->ID, 'am_email_confirmed', 'confirmed' );
					wp_set_auth_cookie( $check_user->ID );
				}
			}
		}
		// End Confirmation

	}

	echo json_encode( $response );
	die;
}

/**
 * ==================== Logout ======================
 * 01.10.2016
 */
add_action( 'wp_ajax_nopriv_ajx20160101040141', 'ajx20160101040141' );
add_action( 'wp_ajax_ajx20160101040141', 'ajx20160101040141' );
function ajx20160101040141()
{
//	wp_clear_auth_cookie();
	wp_logout();
	echo json_encode( "logout_confirmed" );
	die;
}

/**
 * ==================== EDIT USER ======================
 */
add_action( 'wp_ajax_nopriv_ajx20163519013508', 'ajx20163519013508' );
add_action( 'wp_ajax_ajx20163519013508', 'ajx20163519013508' );
function ajx20163519013508()
{
	global $wpdb;
	$data         = $_POST;
	$uid          = get_current_user_id();
	$current_user = get_user_by( "ID", $uid );
	$response     = [
		'user_data'  => null,
		'debug_data' => null,
		'status'     => 'failed'
	];

	if ( $current_user->data->user_email === $data[ 'email' ] ) {

		// Password and confirmation missmath
		if ( $data[ 'pass' ] !== $data[ 'confirm' ] ) {
			$response[ 'status' ] = 'pass_missmath';
			echo json_encode( $response );
			die;
		}

		// Short password
		if ( strlen( $data[ 'pass' ] ) < 5 ) {
			$response[ 'status' ] = 'short_pass';
			echo json_encode( $response );
			die;
		}

		$query_result = $wpdb->get_row( "SELECT user_id FROM {$wpdb->usermeta}
														WHERE meta_key='am_slug' AND meta_value='{$data['slug']}'" );
		if ( (int) $query_result->user_id !== $current_user->ID ) {
			if ( $query_result ) {
				$response[ 'status' ] = 'slug_taken';
				echo json_encode( $response );
				die;
			}
		}

		wp_set_password( $data[ 'pass' ], $current_user->ID );
		update_user_meta( $uid, 'am_slug', $data[ 'slug' ] );
		$response[ 'user_data' ] = am_user( $uid );
		$response[ 'status' ]    = 'success';
	}

	echo json_encode( $response );
	die;
}


/**
 * ==================== Upload files ======================
 */
add_action('wp_ajax_nopriv_ajx20160628050625', 'ajx20160628050625');
add_action('wp_ajax_ajx20160628050625', 'ajx20160628050625');
function ajx20160628050625()
{
	echo json_encode(AmAttachment::uploadfiles());
	die;
}
