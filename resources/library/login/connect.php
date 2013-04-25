<?php
//Database Information
$dbhost = "localhost";
$dbname = "breeezzz_internal";
$dbuser = "root";
$dbpass = "3484534845";
mysql_connect ( $dbhost, $dbuser, $dbpass)or die("Could not connect to MySQL: ".mysql_error());
mysql_select_db($dbname) or die("Could not connect to Database:".mysql_error());
?>