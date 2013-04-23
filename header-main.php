<?php
/*
***
**	Name: Main Header
**	Description: The template for displaying the header.
***
**/
?>
<header>
<!-- Home icon button -->
<div class="home-icon">
	<a href="/internal/"><img src="img/icon-home.png"></a>
</div>

<!-- Title and information area -->
<div class="row">
	<div class="large-10 columns">
		<h2>[BreezDev] Tools</h2>
		<p>This is version 1.0.0.</p>
		<hr />
	</div>
</div>
<?php 
include('admin-panel.php');
$secure = true;
get_admin_panel($secure);
 ?>
</header>