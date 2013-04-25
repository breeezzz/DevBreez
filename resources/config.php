<?php
/***
//*	Description:  — Main configuration file. Stores site wide settings.
***/

//###	[Configuration Options]

	//# Database Information
	$dbhost = "localhost";
	$dbname = "breeezzz_internal";
	$dbuser = "root";
	$dbpass = "3484534845";

	//# Connect to mysql database
	mysql_connect ( $dbhost, $dbuser, $dbpass)or die("Could not connect to MySQL: ".mysql_error());
	mysql_select_db($dbname) or die("Could not connect to Database:".mysql_error());

	//# Define pathways
	defined("LIBRARY_PATH")
		or define("LIBRARY_PATH", realpath(dirname(__FILE__) . '/library'));
		
	defined("TEMPLATES_PATH")
		or define("TEMPLATES_PATH", realpath(dirname(__FILE__) . '/templates'));

	defined("STEP_PATH")
		or define("STEP_PATH", realpath(dirname(__FILE__) . '/webapp/public_html/content'));

	//# Include files
	include(LIBRARY_PATH . "/functions.php");
?>