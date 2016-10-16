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
			'slug'            => get_user_meta( $user->ID, 'am_slug', true ),
			'administrator'   => $user->allcaps[ 'administrator' ],
			'is_current_user' => get_current_user_id() === (int) $user_id ? true : false,

			'network_meta' => [
				'email_confirmed' => get_user_meta( $user->ID, 'am_email_confirmed', true ),
				'user_media'      => [
					'avatar_url' => apply_filters( 'am_user_avatar_url', get_avatar_url( $user->ID ), $user->ID )
				]
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
 * ==================== Get system notices ======================
 */
add_action( 'wp_ajax_nopriv_ajx20160830020813', 'ajx20160830020813' );
add_action( 'wp_ajax_ajx20160830020813', 'ajx20160830020813' );
function ajx20160830020813()
{
	$response = [ 'notices' => null ];
	if ( isset( $_SESSION[ 'am_alerts' ] ) ) {
		$response[ 'notices' ] = $_SESSION[ 'am_alerts' ];
	}
	echo json_encode( $response );
	die;
}

/**
 * ==================== Delete System Notification ======================
 * 30.09.2016
 */

add_action( 'wp_ajax_nopriv_ajx20162830022821', 'ajx20162830022821' );
add_action( 'wp_ajax_ajx20162830022821', 'ajx20162830022821' );
function ajx20162830022821()
{
	$response  = [ 'status' => null ];
	$notice_id = $_GET[ 'body_data' ];
	if ( isset( $_SESSION[ 'am_alerts' ][ $notice_id ] ) ) {
		unset( $_SESSION[ 'am_alerts' ][ $notice_id ] );
		$response[ 'status' ] = 'success';
	}
	$response[ 'data' ] = $notice_id;
	echo json_encode( $response );
	die;
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
			'network_purpose'       => $_am[ 'network-purpose' ],
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
	$current_user     = get_current_user_id();
	$data             = str_replace( '\\', '', $_POST[ 'body_data' ] );
	$decoded_data     = json_decode( $data );
	$data[ 'status' ] = null;
	$commentID        = $decoded_data->id;

	$comment = get_comment( $commentID );
	$response = [
		'status' => null,
		'index' => $decoded_data->index
	];

	if ( ( (int) $comment->user_id === $current_user ) && is_user_logged_in() ) {
		wp_delete_comment( $commentID );
		$response[ 'status' ] = 'success';
	}

	echo json_encode( $response );
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