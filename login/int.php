<?php
$login_address = '
<a href="http://192.168.1.11/internal/login/login.html" class="small button admin-panel">Log in</a>
';
$logout_address = '
<a href="http://192.168.1.11/internal/login/logout.php" class="small button admin-panel">Log out</a>
';

	session_start();
	if(!isset($_SESSION['email']) || $_SESSION['email']=="")
	{
		echo $login_address;
	}
	else
	{
		echo $logout_address . "<br>";
		echo $_SESSION['email'];

	}
?>