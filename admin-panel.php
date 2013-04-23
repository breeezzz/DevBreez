<?php
// Include .php file for adding info snippets to admin panel
include ('info-snippets.php');
// Displays admin panel
function get_admin_panel($secure) {
	if ($secure = true) {
		include('snippets.php'); }
			else if ($secure = false) {	
				echo "Fail."; }
					else { 
						echo "Die."; }
}
?>

