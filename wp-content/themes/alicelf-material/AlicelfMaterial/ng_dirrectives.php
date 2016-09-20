<?php
/**
 * ==================== Defaults ======================
 * 26.08.2016
 * npm run tsc
 * npm run tsc:w
 */
add_action( 'wp_head', 'aa_func_20163526113508', 10 );
function aa_func_20163526113508()
{
	?>
	<script>
		var AMdefaults = {
			baseurl  : "<?php echo get_site_url() ?>",
			themeurl : "<?php echo get_template_directory_uri() ?>",
			themepath: "<?php echo get_template_directory() ?>",
			ajaxurl  : "<?php echo admin_url( 'admin-ajax.php' ) ?>",
			currentUser : "<?php echo get_current_user_id(); ?>"
		};
	</script>
	<base href="<?php echo get_site_url() ?>">
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
			{ name    : 'app', selector: 'AMcontent' },
			{ name    : 'comments', selector: 'AMreviewShell' },
			{ name    : 'user', selector: 'user-profile-component' }
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

		var observer = new MutationObserver(function () {
			mdlUpgradeDom = true;
		});
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
		/* support <= IE 10
		 angular.element(document).bind('DOMNodeInserted', function(e) {
		 mdlUpgradeDom = true;
		 });
		 */

	</script>
	<?php
}

//add_action( 'AM_content', 'aa_func_20161226031250' );
function aa_func_20161226031250()
{
	?>
	<div class="am-wrap">
		<AMcontent></AMcontent>
	</div>
	<?php
}