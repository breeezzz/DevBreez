<?php
/***
// Name: [BreezDev] - Login Application
// Description: Uses the connection in connect.php to verify user login.
// Version: 1.0
// Notes: The password here has been encrypted with SHA1 encryption
***/

// Connects to database
	include "connect.php";
// Verifies email
	$email=mysql_real_escape_string($_POST['email']);
// Verifies password
	$password=mysql_real_escape_string($_POST['password']);
// Selects email and unencrypts/selects password
	$sql="SELECT * FROM login_system WHERE email='$email' and password=SHA1('$password')";
// If the user exists, and the information is correct...
	$result=mysql_query($sql);
	$count=mysql_num_rows($result);
	if($count==1)
	{
// ...Then we start the secured session
		session_start();
		$_SESSION['email']=$email;
		$_SESSION['password']=$password;
// Send the logged in user to a specific location
		header("location:/internal/index.php");
	}
// If something is wrong we display a message
	else
	{

		echo "<h3>Login Attempt Failed<h3>";
	}
?>