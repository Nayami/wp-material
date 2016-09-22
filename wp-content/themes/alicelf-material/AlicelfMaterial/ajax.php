<?php
// ============= AMapiurl =============
if ( ! function_exists( 'AMapiurl' ) ) {
	function AMapiurl()
	{
		return get_site_url() . '/wp-json/';
	}
}

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
 * ==================== USER ======================
 * 17.09.2016
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
		$return_values = [
			'ID'              => $user->ID,
			'display_name'    => $user->data->display_name,
			'user_email'      => $user->data->user_email,
			'user_login'      => $user->data->user_login,
			'user_nicename'   => $user->data->user_nicename,
			'user_registered' => $user->data->user_registered,
			'user_url'        => $user->data->user_url,
			'roles'           => $user->roles,
			'administrator'   => $user->allcaps[ 'administrator' ],
			'logged_in'       => true
		];

	}

	echo json_encode( $return_values );
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
		$set_encoding = $_POST['set_encoding'];
		$tables   = $wpdb->get_results( "SHOW TABLES" );
		$method   = "Tables_in_" . $wpdb->dbname;
		$messages = "<div class='updated notice notice-success'><br>";
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