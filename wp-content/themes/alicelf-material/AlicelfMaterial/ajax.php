<?php
add_action('wp_ajax_nopriv_ajx20163414083403', 'ajx20163414083403');
add_action('wp_ajax_ajx20163414083403', 'ajx20163414083403');
function ajx20163414083403()
{
	echo json_encode(["sdf"=>"response from ajax"]);
	die;
}