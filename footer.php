<?php
/*
***
**	Name: Main Footer
**	Description: The template for displaying the footer.
***
**/
?>
	</div>
</div>

<!-- *** Javascript Stuff *** -->
<!-- Check for Zepto support, load jQuery if necessary -->
<script>
document.write('<script src=js/vendor/'
	+ ('__proto__' in {} ? 'zepto' : 'jquery')
	+ '.js><\/script>');
</script>
<!-- Load all Foundation 4 javascript goodies -->
<script src="js/foundation.js"></script>


<!-- Start the footer element -->
<footer>
<h3>Hello, World!</h3>
</footer>



<!-- Loads all Foundation 4 javascript -->
<script>
$(document).foundation();
</script>
</body>
</html>
<!-- End of the line, baby -->