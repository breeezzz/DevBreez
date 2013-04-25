<?php
	session_start();

	function secure_content() {
			echo "<h2>Logged In</h2>";
			echo "<h3>Setting Cookies...</h3>";
			setcookie("email", $_SESSION['email'], time()+3600);
			setcookie("password", $_SESSION['password'], time()+3600);
			echo "<h3>Cookies set!</h3>";
			echo "<h3>Printing...</h3>";
			echo "Email: ".$_COOKIE["email"]."<br>";
$redirect = <<<EOT
<meta HTTP-EQUIV="REFRESH" content="3; url=/webapp/public_html/index.php">
EOT;
			echo $redirect;
}

	if(!isset($_SESSION['email']) || $_SESSION['email']=="")
	{
		echo "Please login to see this page.....";
	}
	else
	{
		secure_content();
	}
?>