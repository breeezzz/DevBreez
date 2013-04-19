<?php
/*
** Name: Breez Development
** Description: This is the file used to build the segments of the web application independantly
** Version: 1.0.0
*/

function get_static_header()
{
ob_start();
echo <<<EOT
	<html>
	<!--[if IE 8]> 				 <html class="no-js lt-ie9" lang="en"> <![endif]-->
	<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
	<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
	<link rel="stylesheet" href="css/normalize.css" />  
	<link rel="stylesheet" href="css/foundation.css" />  
	<link rel="stylesheet" href="css/breez-style.css" />  
	<script src="js/vendor/custom.modernizr.js"></script>
	<title>Breez Development</title>
	</head>
	<header>
	<!-- Title and information area -->
	<div class="row">
		<div class="large-12 columns">
EOT;
//Dynamic php file is loaded directly after this
$header = ob_get_clean();
echo $header;
}

function get_static_content()
{
ob_start();
echo <<<EOT
		</div>
	</div>
	</header>
<body>
	<!-- Main content area -->
	<div class="row">
		<div class="large-8 columns">
EOT;
$content = ob_get_clean();
echo $content;
}

function get_static_footer()
{
ob_start();
echo <<<EOT
		</div>
	</div>
	</body>
EOT;
$footer = ob_get_clean();
echo $footer;
}

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