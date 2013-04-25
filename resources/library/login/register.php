<?php
	include "connect.php";
	$name=mysql_real_escape_string($_POST['name']);
	$email=mysql_real_escape_string($_POST['email']);
	$password=mysql_real_escape_string($_POST['password']);
	$insert=mysql_query("INSERT INTO login_system (name,email,password) VALUES ('$name','$email','$password')") or die("Not Connected");
	echo "Successfully Registered....";
?>