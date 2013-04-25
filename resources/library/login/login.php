<?php
	include "connect.php";
	$email=mysql_real_escape_string($_POST['email']);
	$password=mysql_real_escape_string($_POST['password']);
	$sql="SELECT * FROM login_system WHERE email='$email' and password='$password'";
	$result=mysql_query($sql);

	$count=mysql_num_rows($result);
	if($count==1)
	{
		session_start();
		$_SESSION['email']=$email;
		$_SESSION['password']=$password;
		header("location:integration.php");
	}
	else
	{
		echo "Login Attempt Failed";
	}

?>