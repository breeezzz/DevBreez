<?php

	require_once(realpath(dirname(__FILE__) . "/../resources/config.php"));

	require_once(LIBRARY_PATH . "/templateFunctions.php");

	/*
		Now you can handle all your php logic outside of the template
		file which makes for very clean code!
	*/
	
	$setInIndexDotPhp = "";
	
	// Must pass in variables (as an array) to use in template
	$variables = array(
		'setInIndexDotPhp' => $setInIndexDotPhp
	);
	
	renderLayoutWithContentFile("page-2.php", $variables);
?>