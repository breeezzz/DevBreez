<?php
	include "connect.php";	// mySQL database connection
	include "login-functions.php";	// Allows us to use global functions or messages
	$password=mysql_real_escape_string($_POST['password']);
	$name=mysql_real_escape_string($_POST['name']);
	$email=mysql_real_escape_string($_POST['email']);
	$insert=mysql_query("
	INSERT INTO login_system (id,password,name,email) 
	VALUES ('', SHA1('$password'),'$name','$email')") 
	or die(registration_error());
	echo registration_success();
?>