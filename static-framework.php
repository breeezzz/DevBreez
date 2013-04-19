<?php
/*
** Name: Breez Development
** Description: This is the file used to build the segments of the web application independantly
** Version: 1.0.0
*/

//HEADER
function get_static_header()
{
ob_start();
echo <<<EOT
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
<!-- CSS -->
	<link rel="stylesheet" href="css/normalize.css" />  
	<link rel="stylesheet" href="css/foundation.css" />  
	<link rel="stylesheet" href="css/breez-style.css" />
<!-- JAVASCRIPT -->
	<script src="js/vendor/custom.modernizr.js"></script>
<!-- TITLE -->
	<title>Breez Development</title>
</head>
<!-- HEADER -->
<header>
	<!-- Title and information area -->
	<div class="row">
		<div class="large-12 columns">
EOT;
//Dynamic php file is loaded directly after this
$header = ob_get_clean();
echo $header;
}


//SIDEBAR
function get_static_sidebar()
{
ob_start();
echo <<<EOT
<div class="large-4 columns">
EOT;
$sidebar = ob_get_clean();
echo $sidebar;
}
?>