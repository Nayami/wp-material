<?php
/**
 * ==================== Change Base Href for user endpoint ======================
 * 22.09.2016
 */
add_filter( 'AMbaseHref', 'aa_func_20165122045113', 10, 1 );
function aa_func_20165122045113( $site_url )
{
	if ( is_amuserpage() )
		$site_url = get_am_network_endpoint();

	return $site_url;
}

/**
 * ==================== Defaults ======================
 * 26.08.2016
 * npm run tsc
 * npm run tsc:w
 */
add_action( 'wp_head', 'aa_func_20163526113508', 10 );
function aa_func_20163526113508()
{
	$site_url = get_site_url();
	global $_am;
	$values = [
		'auth_info' => [
			'network_purpose'       => $_am[ 'network-purpose' ],
			'registration_info'     => $_am[ 'network-registration' ],
			'registration_strategy' => $_am[ 'network-confirmation-flow' ]
		]
	];
	?>
	<script>
		var AMdefaults = {
			baseurl        : "<?php echo $site_url ?>",
			themeurl       : "<?php echo get_template_directory_uri() ?>",
			themepath      : "<?php echo get_template_directory() ?>",
			ajaxurl        : "<?php echo admin_url( 'admin-ajax.php' ) ?>",
			currentUser    : "<?php echo get_current_user_id(); ?>",
			networkEndpoint: "<?php echo get_am_network_endpoint() ?>",
			themeSettings  : <?php echo json_encode( $values ) ?>
		};
	</script>
	<base href="<?php echo apply_filters( 'AMbaseHref', $site_url ) ?>">
	<?php
}

add_action('admin_head', 'aa_func_20163316093324');
function aa_func_20163316093324()
{
	$allSidebars = json_encode($GLOBALS['wp_registered_sidebars']);
	?>
	<script>
		var AdminDefaults = {
			editpostId : "<?php echo $_GET['post'] ?>",
			allSidebars : <?php echo $allSidebars ?>
		};
	</script>
	<?php
}

add_action( 'wp_footer', 'aa_func_20162526072510', 20 );
function aa_func_20162526072510()
{
	?>
	<script>
		System.import('app').catch(function(err) {
			console.error(err);
		});
		var mdlUpgradeDom = false;
		setInterval(function() {
			if (mdlUpgradeDom) {
				componentHandler.upgradeDom();
				mdlUpgradeDom = false;
			}
		}, 200);

		var observer = new MutationObserver(function() {
			mdlUpgradeDom = true;
		});
		observer.observe(document.body, {
			childList: true,
			subtree  : true
		});
		/* support <= IE 10
		 angular.element(document).bind('DOMNodeInserted', function(e) {
		 mdlUpgradeDom = true;
		 });
		 */
	</script>
	<?php
}

add_action('AM_afterbody_start', 'aa_func_20160012120047',99);
function aa_func_20160012120047()
{
	echo "<GlobConfirmComponent></GlobConfirmComponent>";
	echo "<ModalDialogComponent></ModalDialogComponent>";
	echo "<FlashNotificationsComponent></FlashNotificationsComponent>";
	if(is_amuserpage()) {
		echo "<GlobLoaderComponent></GlobLoaderComponent>";
	}

}
add_action('after_main_menu', 'aa_func_20160012070004');
function aa_func_20160012070004()
{
	if ( is_plugin_active( 'woocommerce/woocommerce.php' ) ) {
		echo "<div id='aa-woo-minicart'><AMinicartRoot></AMinicartRoot></div>";
	}
}