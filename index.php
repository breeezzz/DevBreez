<?php 
/*
**	Name: Breez Development Tools
**	Version: 1.0.0
**	Description: Framework for making the development process easier.
*/
?>

<!-- Includes -->
<?php include('static-framework.php');	//includes php for building the website ?>

<!-- Start Building Website -->
	<!--header-->
		<?php	//gets the static header
			get_static_header();?>
		<?php	//gets the dynamic header
			include('header.php')?>
	<!---->

	<!--content-->
		<?php	//gets the static content
			get_static_content();?>
		<?php	//gets the dynamic content
			include('content.php')?>
	<!---->

	<!--sidebar-->
		<?php	//gets the static sidebar
			get_static_sidebar();?>
		<?php	//gets the dynamic sidebar
			include('sidebar.php')?>
	<!---->

	<!--footer-->
		<?php	//gets the dynamic footer
			include('footer.php')?>
		<?php	//gets the static footer
			get_static_footer();?>
	<!---->
<!-- END Building Website -->