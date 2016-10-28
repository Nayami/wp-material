<?php

namespace AlicelfMaterial\Helpers;

use AlicelfMaterial\Helpers\Helper;

class AmAttachment {

	static function get_attachment( $attachment_id )
	{
		$attachment = get_post( $attachment_id );

		return [
			'attachment_ID' => $attachment->ID,
			'alt'           => get_post_meta( $attachment->ID, '_wp_attachment_image_alt', true ),
			'caption'       => $attachment->post_excerpt,
			'description'   => $attachment->post_content,
			'href'          => get_permalink( $attachment->ID ),
			'src'           => $attachment->guid,
			'title'         => $attachment->post_title
		];
	}

	static function delete_attachment( $id )
	{
		return Helper::deleteAttachment( $id );
	}

	function upload_user_file( $file = [ ] )
	{
		require_once( ABSPATH . 'wp-admin/includes/admin.php' );
		$file_return = wp_handle_upload( $file, array( 'test_form' => false ) );
		if ( isset( $file_return[ 'error' ] ) || isset( $file_return[ 'upload_error_handler' ] ) ) {
			return false;
		} else {
			$filename = $file_return[ 'file' ];

			$attachment    = array(
				'post_mime_type' => $file_return[ 'type' ],
				'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $filename ) ),
				'post_content'   => '',
				'post_status'    => 'inherit',
				'guid'           => $file_return[ 'url' ]
			);
			$attachment_id = wp_insert_attachment( $attachment, $file_return[ 'url' ] );
			require_once( ABSPATH . 'wp-admin/includes/image.php' );
			$attachment_data = wp_generate_attachment_metadata( $attachment_id, $filename );
			wp_update_attachment_metadata( $attachment_id, $attachment_data );
			if ( 0 < intval( $attachment_id ) ) {
				return $attachment_id;
			}
		}

		return false;
	}

	static function uploadfiles( $size = 30000, $allowed_types = [ 'image/png', 'image/jpeg' ] )
	{
		$response = [
			'message' => null,
			'data'    => [ ],
			'status'  => 'fail'
		];
		foreach ( $_FILES as $file ) {
			if ( is_array( $file ) ) {

				if ( ! in_array( $file[ 'type' ], $allowed_types ) ) {
					$response[ 'message' ] = 'wrong_type';
					return $response;
				}

				if ( $file[ 'size' ] > $size ) {
					$response[ 'message' ] = 'filesize_exceed';
					return $response;
				}
				$id                   = self::upload_user_file( $file );
				$response[ 'data' ][] = self::get_attachment( $id );
			}
		}
		if ( ! empty( $response[ 'data' ] ) ) {
			$response[ 'status' ]  = 'success';
			$response[ 'message' ] = 'uploaded';
		}

		return $response;

	}
}