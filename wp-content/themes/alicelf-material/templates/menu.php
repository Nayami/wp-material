<?php
global $_am;
?>
<header class="mdl-layout__header">
	<div class="mdl-layout__header-row">
		<!-- Title -->
		<span class="mdl-layout-title"><?php echo material_logo() ?></span>
		<!-- Add spacer, to align navigation to the right -->
		<div class="mdl-layout-spacer"></div>
		<!-- Navigation. We hide it in small screens. -->
		<?php
		if ( ! has_nav_menu( 'primary' ) ) {
			$menu_id = wp_create_nav_menu( "Default Alicelf Menu" );

			wp_update_nav_menu_item( $menu_id, 0, [
					'menu-item-title'   => __( 'Home' ),
					'menu-item-classes' => 'mdl-navigation__link',
					'menu-item-url'     => home_url( '/' ),
					'menu-item-status'  => 'publish'
				]
			);
			wp_nav_menu( [
				'show_home'  => true,
				'menu_class' => 'mdl-navigation', // mdl-navigation__link
				'container'  => 'nav',
				'walker'     => new AMenu()
			] );
		} else {
			wp_nav_menu( [
				'show_home'      => true,
				'menu_class'     => 'mdl-navigation',
				'theme_location' => 'primary',
				'container'      => 'nav',
				'walker'         => new AMenu()
			] );
		}
		?>
	</div>
</header>

<div class="mdl-layout__drawer">
	<span class="mdl-layout-title"><?php echo material_logo() ?></span>
	<nav class="mdl-navigation">
		<?php
		wp_nav_menu( [
			'show_home'      => true,
			'menu_class'     => 'mdl-navigation',
			'theme_location' => 'primary',
			'container'      => 'nav'
		] );
		?>
	</nav>
</div>