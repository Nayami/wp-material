<?php
get_header();
// "/" separated values
$user_params = $wp_query->query_vars[am_profile_slug()];

?>
	<user-profile-component></user-profile-component>
<?php
get_footer();