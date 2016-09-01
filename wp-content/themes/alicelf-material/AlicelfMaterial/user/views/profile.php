<?php
get_header();

echo "<pre>";
print_r($wp_query->query_vars[am_profile_slug()]);
echo "</pre>";

get_footer();