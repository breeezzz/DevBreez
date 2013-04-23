<?php
/***
//  Name: Configuration File
//	Location: ../resources/config.php
//	Description:  — Main configuration file. Should store site wide settings.
//  Notes: Include this in head.php
***/

/*
	The important thing to realize is that the config file should be included in every
	page of your project, or at least any page you want access to these settings.
*/

$config = array(
	"db" => array(
		"db1" => array(
			"dbname" => "login_system",
			"username" => "root",
			"password" => "3484534845",
			"host" => "localhost"
		),
"db2" => array(
			"dbname" => "database2",
			"username" => "dbUser",
			"password" => "pa$$",
			"host" => "localhost"
		)
	),
	"urls" => array(
		"baseUrl" => "http://192.168.1.11"
	),
	"paths" => array(
		"resources" => "../resources",
		"images" => array(
			"content" => $_SERVER["DOCUMENT_ROOT"] . "/img/content",
			"layout" => $_SERVER["DOCUMENT_ROOT"] . "/img/layout"
		)
	)
);

/*
	I will usually place the following in a bootstrap file or some type of environment
	setup file (code that is run at the start of every page request), but they work 
	just as well in your config file if it's in php (some alternatives to php are xml or ini files).
*/

/*
	Creating constants for heavily used paths makes things a lot easier.
	ex. require_once(LIBRARY_PATH . "Paginator.php")
*/
defined("LIBRARY_PATH")
	or define("LIBRARY_PATH", realpath(dirname(__FILE__) . '/library'));
	
defined("TEMPLATES_PATH")
	or define("TEMPLATES_PATH", realpath(dirname(__FILE__) . '/templates'));

/*
	Error reporting.
*/
ini_set("error_reporting", "true");
error_reporting(E_ALL|E_STRCT);

?>