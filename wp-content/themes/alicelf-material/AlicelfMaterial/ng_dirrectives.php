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
			baseurl  : "<?php site_url() ?>",
			themeurl : "<?php echo get_template_directory_uri() ?>",
			themepath: "<?php echo get_template_directory() ?>",
			ajaxurl  : "<?php admin_url( 'admin-ajax.php' ) ?>"
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
		System.import('comments').catch(function(err) {
			console.error(err);
		});
	</script>
	<?php
}

add_action( 'AM_content', 'aa_func_20161226031250' );
function aa_func_20161226031250()
{
	?>
	<div class="am-wrap">
		<AMcontent>Loading...</AMcontent>
	</div>
	<?php
}