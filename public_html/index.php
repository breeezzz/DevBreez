<?php
// Hello, World!
	require_once(realpath(dirname(__FILE__) . "/../resources/config.php"));
	require_once(LIBRARY_PATH . "/functions.php");
	/*
		Now you can handle all your php logic outside of the template
		file which makes for very clean code!
	*/	
	$setInIndexDotPhp = "Hey! I was set in the index.php file.";	
	// Must pass in variables (as an array) to use in template
	$variables = array(
		'setInIndexDotPhp' => $setInIndexDotPhp
	);	
	renderLayoutWithContentFile("home.php", $variables);
?>