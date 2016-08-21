<?php
add_filter( 'paypal_form_fields', 'aa_func_20160321010314', 10, 1 );
function aa_func_20160321010314( $fields )
{
	array_unshift( $fields, [
		'id'    => 'pp_sandbox',
		'title' => 'Sandbox',
		'type'  => 'checkbox',
		'items' => [
			[
				'label'   => 'Enabled',
				'value'   => 'sandbox',
				'default' => false
			],
		]
	] );

	$fields [] = [
		'id'    => 'api_username',
		'title' => 'Username',
		'type'  => 'text'
	];

	return $fields;
}