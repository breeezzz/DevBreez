<?php 
/*
**	Name: Breez Development Tools
**	Version: 1.0.0
**	Description: Framework for making the development process easier.
*/
?>
<?php include('static-framework.php');	//php stored backend for building the website ?>
<?php include('functions.php');	//php functions ?>

<!-- Start Building Website -->

	<!--header-->
		<?php	//gets the static header
			get_static_header();?>

		<?php	//gets the dynamic header
			include('header.php')?>


	<!--content-->
		<?php	//gets the dynamic content
			include('content.php')?>


	<!--sidebar-->
		<?php	//gets the static sidebar
			get_static_sidebar();?>

		<?php	//gets the dynamic sidebar
			include('sidebar.php')?>


	<!--footer-->
		<?php	//gets the dynamic footer
			include('footer.php')?>