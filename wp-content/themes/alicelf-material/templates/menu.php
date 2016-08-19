<header class="mdl-layout__header mdl-layout__header--scroll">
	<?php
	if ( ! has_nav_menu( 'primary' ) ) {
		$menu_id = wp_create_nav_menu( "Default Alicelf Menu" );

		wp_update_nav_menu_item( $menu_id, 0, [
				'menu-item-title'   => __( 'Home' ),
				'menu-item-classes' => 'home',
				'menu-item-url'     => home_url( '/' ),
				'menu-item-status'  => 'publish'
			]
		);
		wp_nav_menu( [
			'show_home'  => true,
			'menu_class' => 'mdl-navigation',
			'container'  => false,
		] );
	} else {
		?>
		<div class="mdl-layout__header-row">
			<!-- Logo -->
			<span class="mdl-layout-title">
				<?php echo get_bloginfo('name') ?>
			</span>
			<!-- Add spacer, to align navigation to the right -->
			<div class="mdl-layout-spacer"></div>
			<!-- Navigation -->
				<?php
				// <a class="mdl-navigation__link" href="">Link</a>
				wp_nav_menu( [
					'show_home'      => true,
					'menu_class'     => 'mdl-navigation',
					'theme_location' => 'primary',
					'container'      => 'nav'
				] );
				?>
		</div>


	<?php } ?>
</header>

<!--Mobile nav-->
<div class="mdl-layout__drawer">
	<span class="mdl-layout-title">
		<?php echo get_bloginfo('name') ?>
	</span>
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