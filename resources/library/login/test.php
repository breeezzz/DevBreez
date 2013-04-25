<?php
	include "connect.php";
	$email=mysql_real_escape_string($_POST['email']);
	$password=mysql_real_escape_string($_POST['password']);
	$sql="SELECT * FROM login_system WHERE email='$email' and password='$password'";
	$result=mysql_query($sql);

session_start();
if (!$result) {
    $message  = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $sql;
    die($message);
}

while ($row = mysql_fetch_assoc($result)) {
    echo $row['name'];
    echo $row['id'];
    echo $row['email'];
    echo $row['access_level'];
}

mysql_free_result($result);

?>
