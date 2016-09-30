<?php
// ============= AMapiurl =============
if ( ! function_exists( 'AMapiurl' ) ) {
	function AMapiurl()
	{
		return get_site_url() . '/wp-json/';
	}
}
add_filter( 'wp_mail_content_type', 'aa_func_20162528072509' );
function aa_func_20162528072509()
{
	return "text/html";
}

// ============= Am_user =============
if ( ! function_exists( 'am_user' ) ) {
	function am_user( $user_id )
	{
		$user = get_user_by( 'ID', $user_id );
		if ( ! $user )
			return false;

		return [
			'ID'              => $user->ID,
			'display_name'    => $user->data->display_name,
			'user_email'      => $user->data->user_email,
			'user_login'      => $user->data->user_login,
			'user_nicename'   => $user->data->user_nicename,
			'user_registered' => $user->data->user_registered,
			'user_url'        => $user->data->user_url,
			'roles'           => $user->roles,
			'administrator'   => $user->allcaps[ 'administrator' ],
			'network_meta'    => [
				'email_confirmed' => get_user_meta( $user->ID, 'am_email_confirmed', true )
			]
		];
	}
}

if ( ! function_exists( 'send_me_confirmation_registration_link' ) ) {

	/**
	 * @param $email
	 * @param string $type = reset/confirm
	 *
	 * @return bool|null|string
	 */
	function send_me_confirmation_registration_link( $email, $type = 'reset' )
	{
		if ( ! $email )
			return false;
		$mail_type  = $type === 'reset' ? 'Reset Password' : 'Confirmation Link';
		$link       = get_am_network_endpoint() . "/screen/restorepass";
		$token      = sha1( uniqid() . $email );
		$email_link = $link . "?token=" . $token . "&email=" . $email;
		$mail_body  = "Your activation link: <br>";
		$mail_body .= "<a href='{$email_link}'>{$mail_type}</a>";
		$from              = get_option( 'admin_email' );
		$headers           = "From: {$from}\r\n";
		$send_mail_process = wp_mail( $email, $mail_type, $mail_body, $headers );
		if ( $send_mail_process )
			return $token;

		return null;
	}
}

/**
 * ==================== SETTINGS ======================
 * 28.09.2016
 */
add_action( 'wp_ajax_nopriv_ajx20162128122131', 'ajx20162128122131' );
add_action( 'wp_ajax_ajx20162128122131', 'ajx20162128122131' );
function ajx20162128122131()
{
	global $_am;
	$values = [
		'auth_info' => [
			'registration_info'     => $_am[ 'network-registration' ],
			'registration_strategy' => $_am[ 'network-confirmation-flow' ]
		]
	];
	echo json_encode( $values );
	die;
}

/**
 * Convert tables to utf8 encoding
 */
add_action( 'wp_ajax_aa_func_20150827030852', 'aa_func_20150827030852' );
function aa_func_20150827030852()
{
	if ( isset( $_POST[ 'do_the_conversion' ] ) ) {
		global $wpdb;
		$set_encoding = $_POST[ 'set_encoding' ];
		$tables       = $wpdb->get_results( "SHOW TABLES" );
		$method       = "Tables_in_" . $wpdb->dbname;
		$messages     = "<div class='updated notice notice-success'><br>";
		foreach ( $tables as $table ) {
			$wpdb->query( "ALTER TABLE {$table->$method} DEFAULT CHARACTER SET utf8 COLLATE {$set_encoding};" );
			$wpdb->query( "ALTER TABLE {$table->$method} CONVERT TO CHARACTER SET utf8 COLLATE {$set_encoding};" );
			$messages .= "Table " . $table->$method . " has been converted to {$set_encoding}<br>";
		}
		$messages .= "<hr>Conversion complete. <br><br></div>";
		echo $messages;
		die;
	}
}

/**
 * ====================================================
 * ==================== COMMENTS ======================
 * ====================================================
 */

/**
 * ==================== Create Comment ======================
 * 16.09.2016
 */
add_action( 'wp_ajax_nopriv_ajx20163414083403', 'ajx20163414083403' );
add_action( 'wp_ajax_ajx20163414083403', 'ajx20163414083403' );
function ajx20163414083403()
{
	$data = $_POST;
	$time = current_time( 'mysql' );

	$comment_data = array(
		'comment_post_ID'      => $data[ 'postId' ],
		'comment_author'       => sanitize_text_field( $data[ 'name' ] ),
		'comment_author_email' => $data[ 'email' ],
		'comment_author_url'   => $data[ 'website' ],
		'comment_content'      => wp_strip_all_tags( $data[ 'body' ] ),
		'comment_date'         => $time,

		'comment_parent' => 0,
//		'comment_type'      => '',
		'user_id'        => get_current_user_id(),
//		'comment_author_IP' => '127.0.0.1',
//		'comment_agent'     => '',

		'comment_approved' => 1,
	);

	$commentid = wp_insert_comment( $comment_data );
//	$commentid = 1;
	$comment = wp_remote_get( AMapiurl() . 'posts/' . $data[ 'postId' ] . '/comments/' . $commentid );

	echo $comment[ 'body' ];
	die;
}

/**
 * ==================== Delete Comment ======================
 * 16.09.2016
 */
add_action( 'wp_ajax_nopriv_ajx20165916125929', 'ajx20165916125929' );
add_action( 'wp_ajax_ajx20165916125929', 'ajx20165916125929' );
function ajx20165916125929()
{
	$data             = $_REQUEST;
	$data[ 'status' ] = null;
	$commentID        = $data[ 'commentID' ];
	$current_user     = get_current_user_id();

	$comment = get_comment( $commentID );

	if ( ( (int) $comment->user_id === $current_user ) && is_user_logged_in() ) {
		wp_delete_comment( $commentID );
		$data[ 'status' ] = 'success';
	}

	echo json_encode( $data );
	die;
}

/**
 * ==================== Update Comment ======================
 * 16.09.2016
 */
add_action( 'wp_ajax_nopriv_ajx20161116071151', 'ajx20161116071151' );
add_action( 'wp_ajax_ajx20161116071151', 'ajx20161116071151' );
function ajx20161116071151()
{
	$data             = $_REQUEST;
	$data[ 'status' ] = null;
	$data[ 'author' ] = json_decode( stripslashes( $data[ 'author' ] ) );
	$data[ 'meta' ]   = json_decode( stripslashes( $data[ 'meta' ] ) );

	$commentID    = $data[ 'ID' ];
	$comment      = get_comment( $commentID );
	$current_user = get_current_user_id();

	if ( ( (int) $comment->user_id === $current_user ) && is_user_logged_in() ) {
		wp_update_comment( [
			"comment_ID"      => $commentID,
			'comment_content' => wp_strip_all_tags( $data[ 'content' ] ),
		] );
		$data[ 'status' ] = 'success';
	}

	echo json_encode( $data );
	die;
}

/**
 * ================================================
 * ==================== USER ======================
 * ================================================
 */
add_action( 'wp_ajax_nopriv_ajx20163917023918', 'ajx20163917023918' );
add_action( 'wp_ajax_ajx20163917023918', 'ajx20163917023918' );
function ajx20163917023918()
{
	$return_values = [
		'ID'        => null,
		'logged_in' => false
	];

	if ( is_user_logged_in() ) {
		$user          = wp_get_current_user();
		$return_values = am_user( $user->ID );
	}

	echo json_encode( $return_values );
	die;
}

/**
 * ==================== AUTH ======================
 * 24.09.2016
 */
add_action( 'wp_ajax_nopriv_ajx20162924062955', 'ajx20162924062955' );
add_action( 'wp_ajax_ajx20162924062955', 'ajx20162924062955' );
function ajx20162924062955()
{
	$data         = str_replace( '\\', '', $_POST[ 'body_data' ] );
	$decoded_data = json_decode( $data );
	$login        = $decoded_data->fname;
	$response     = [
		'message' => null
	];
	$user         = get_user_by( 'login', $login );

	if ( ! $user ) {
		$response[ 'message' ] = 'notfound';
		echo json_encode( $response );
		die;
	}
	if ( $user && wp_check_password( $decoded_data->passw, $user->data->user_pass, $user->ID ) ) {
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
 * ==================== REMIND EMAIL REQUEST ======================
 * 28.09.2016
 */
add_action( 'wp_ajax_nopriv_ajx20165728055701', 'ajx20165728055701' );
add_action( 'wp_ajax_ajx20165728055701', 'ajx20165728055701' );
function ajx20165728055701()
{
	$data         = str_replace( '\\', '', $_POST[ 'body_data' ] );
	$decoded_data = json_decode( $data );
	$email        = $decoded_data->email;
	$ret_val      = [
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
			'action' => $decoded_data->action,
			'time'   => date( 'Y-m-d H:i:s' )
		], [ '%s', '%s', '%s', '%s' ] );
		$ret_val[ 'status' ] = 'success';
	}

	echo json_encode( $ret_val );
	die;
}

/**
 * ==================== Check if hash exists in db ======================
 * 28.09.2016
 */
add_action( 'wp_ajax_nopriv_ajx20161128111129', 'ajx20161128111129' );
add_action( 'wp_ajax_ajx20161128111129', 'ajx20161128111129' );
function ajx20161128111129()
{
	global $wpdb;
	$table        = $wpdb->prefix . "user_reset_passwords";
	$data         = str_replace( '\\', '', $_POST[ 'body_data' ] );
	$decoded_data = json_decode( $data );
	$reset_data   = $wpdb->get_row( "SELECT hash, email, action, time FROM {$table}
																		WHERE hash='{$decoded_data->token}' AND email='{$decoded_data->email}'" );
	echo json_encode( $reset_data );
	die;
}

/**
 * ==================== Restore Pass request ======================
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
	$data                 = str_replace( '\\', '', $_POST[ 'body_data' ] );
	$decoded_data         = json_decode( $data );
	$response_data        = [
		'status'     => 'failed',
		'user'       => null,
		'check_mail' => null
	];
	if ( $registration_allowed === 'yes' ) {
		$check_user = get_user_by( 'email', $decoded_data->login );

		if ( $check_user ) {
			$response_data[ 'status' ] = 'user_exists';
			echo json_encode( $response_data );
			die;
		}

		if ( $strategy === 'confirm_before' ) {

		} else {
			$userdata = [
				'user_login' => $decoded_data->login,
				'user_email' => $decoded_data->login,
				'user_pass'  => $decoded_data->passw
			];
			wp_insert_user( $userdata );

			$user = get_user_by( 'email', $decoded_data->login );
			update_user_meta( $user->ID, 'am_email_confirmed', 'not_confirmed' );
			$response_data[ 'user' ] = am_user( $user->ID );

			if ( $strategy === 'confirm_after' ) {
				$token = send_me_confirmation_registration_link( $decoded_data->login, 'confirm' );
				if ( $token ) {
					$wpdb->insert( $table, [
						'hash'   => $token,
						'email'  => $decoded_data->login,
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