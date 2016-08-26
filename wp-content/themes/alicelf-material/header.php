<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>"/>
	<meta name="description" content="<?php bloginfo( 'description' ); ?>"/>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
	<title><?php wp_title() ?></title>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>"/>
	<?php wp_head(); ?>
</head>
<body <?php body_class() ?>>

<?php do_action( 'AM_afterbody_start' ) ?>

<!-- Always shows a header, even in smaller screens. -->
<div id="am-appwrap" class="mdl-layout mdl-js-layout">

	<?php include locate_template('templates/menu.php') ?>

	<main class="mdl-layout__content">
		<div class="page-content">
			<?php do_action('AM_content') ?>