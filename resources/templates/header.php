<!DOCTYPE html>
<html>
	<head>
		<!-- JAVASCRIPT -->
			<!-- cross-browser/old browser support -->
			<script src="/webapp/public_html/js/vendor/custom.modernizr.js"></script>
			<!-- allows for showing/hiding divs by #id -->
			<script src="/webapp/public_html/js/show-hide.js"></script>

		<!-- META -->
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width" />

		<!-- CSS -->
			<link rel="stylesheet" href="/webapp/public_html/css/normalize.css" />  
			<link rel="stylesheet" href="/webapp/public_html/css/foundation.css" />  
			<link rel="stylesheet" href="/webapp/public_html/css/style.css" />

		<!-- FAVICON<3 -->
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
		<!-- TITLE -->
		<title>Breez Development</title>
	</head>

<header>
	<!-- Home icon button -->
	<div class="home-icon">
	<a href="/"><img src="/webapp/public_html/img/icon-home.png"></a>
	</div>

	<!-- Title and information area -->
	<div class="row">
		<div id="header-information" class="large-8 columns">
			<h2>[<a href="<?php get_git(); ?>">BreezDev</a>]Tools</h2>
                <ul>
                    <li><strong>Version:</strong>
                    <?php get_current_version(); ?></li>

                    <li><strong>Last Update:</strong>
                    <?php get_version_modified(); ?></li>

                </ul>
                <hr>
		</div>
	</div>

	<!-- Admin panel -->
	<div id="admin-panel">

	</div>
</header>