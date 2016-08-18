<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

	<article>
		<h1><?php the_title() ?></h1>
	</article>

<?php endwhile; endif; wp_reset_query() ?>