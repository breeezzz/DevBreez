<?php
//#
//* Admin Panel
//#
//Start session

?>


<?php
	//# Displays users IP address.
	function ip_address() {
		if ( isset($_SERVER["REMOTE_ADDR"]) )    { 
			echo '' . $_SERVER["REMOTE_ADDR"] . ' '; 
		} if ( isset($_SERVER["HTTP_CLIENT_IP"]) )    { 
			echo '' . $_SERVER["HTTP_CLIENT_IP"] . ' '; 
		}
	}

	//# Displays the date.
	function the_date() {
		echo date('M d');
	}

	//# Displays the time.
	function the_time() {
		echo date('g:i a');
	}

	
	//# Admin Panel
	function the_admin_panel() {
		session_start();

$control_panel = <<<EOD
<a href="#" class="small button">Control Panel</a>
EOD;

$login_address = <<<EOD
<a href="/webapp/resources/library/login/login.html" class="small button">Log in</a>
EOD;

$logout_address = <<<EOD
<a href="/webapp/resources/library/login/logout.php" class="small button">Log out</a>
EOD;

	if(!isset($_SESSION['email']) || $_SESSION['email']=="") {
		echo $login_address;					
	}
		else {
			echo $control_panel . "<br>";
			echo $logout_address . "<br>";
			echo $_SESSION['email'];
				}
}
?>
<div id="snippets">
	<ul>
		<li><?php the_admin_panel(); ?>
		<li><?php ip_address(); ?>
		<li><?php the_date(); ?>
		<li><?php the_time(); ?></li>
	</ul>
</div>