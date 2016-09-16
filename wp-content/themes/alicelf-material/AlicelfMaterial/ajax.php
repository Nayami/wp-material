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
		'comment_content'      => $data[ 'body' ],
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
	$data         = $_REQUEST;
	$data[ 'status' ] = null;
	$commentID    = $data[ 'commentID' ];
	$current_user = get_current_user_id();

	$comment = get_comment( $commentID );

	if ( ( $comment->user_id === $current_user ) || is_super_admin( $current_user ) ) {
		wp_delete_comment( $commentID );
		$data[ 'status' ] = 'success';
	}

	echo json_encode( $data );
	die;
}