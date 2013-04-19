<?php
/**
 * General template tags that can go anywhere in a template.
 */

/**
*
 * Load header template.
 *
 */

function get_header( $name = null ) {
	do_action( 'get_header', $name );

	$templates = array();
	if ( isset($name) )
		$templates[] = "header-{$name}.php";

	$templates[] = 'header.php';

	// Backward compat code will be removed in a future release
	if ('' == locate_template($templates, true))
		load_template( ABSPATH . WPINC . 'header.php');
}
?>