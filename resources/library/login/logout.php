<?php
// Log out script
session_start();
session_unset();
session_destroy();
header("location:http://192.168.1.11");
exit();
?>