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
	?>
	<script>
		var AMdefaults = {
			baseurl        : "<?php echo $site_url ?>",
			themeurl       : "<?php echo get_template_directory_uri() ?>",
			themepath      : "<?php echo get_template_directory() ?>",
			ajaxurl        : "<?php echo admin_url( 'admin-ajax.php' ) ?>",
			currentUser    : "<?php echo get_current_user_id(); ?>",
			networkEndpoint: "<?php echo get_am_network_endpoint() ?>"
		};
	</script>
	<base href="<?php echo apply_filters( 'AMbaseHref', $site_url ) ?>">
	<?php
}

add_action( 'wp_footer', 'aa_func_20162526072510', 20 );
function aa_func_20162526072510()
{
	?>
	<script>
		/**
		 * ==================== Import and bootstrapping ======================
		 * 29.08.2016
		 */
		var activeModules = [
			{name     : 'app', selector: 'AMcontent' },
			{name     : 'comments', selector: 'AMreviewShell' },
			{name     : 'user', selector: 'user-profile-component' }
		];

		for (var mdlcnt = activeModules.length; mdlcnt--;) {
			var LaunchModule = activeModules[mdlcnt];
			if (document.getElementsByTagName(LaunchModule.selector).length > 0) {
				System.import(LaunchModule.name).catch(function(err) {
					console.error(err);
				});
			}
		}

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