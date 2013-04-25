<?php
	/*
		Any variables passed in through the variables parameter in our renderLayoutWithContentPage() function
		are available in here.
	*/
?>
<body>
<div class="row">
	<div class="large-8 columns">

	<!-- Information Area -->
		<h3>The Information Station</h3>
		<div class="row">
			<div class="large-12 columns">
				<div class="panel">
					<p>First incantation of the <a href=
					"https://github.com/breeezzz/Internal">Breez Development tool</a> -
					an Open Source web application available on GitHub. It's been
					created to bridge the developer/client gap and assist in project
					and content management.</p>
					<p>Please report any bugs to the <a href=
					"mailo:brz1080@gmail.com">admin.</a></p>
					<p><?php echo $setInIndexDotPhp; ?></p>
				</div>
			</div>
		</div>

	<!-- Tools area -->
		<h3>Make life easier...</h3>
		<div class="row">
			<div class="large-12 columns" id="main-panels">

				<div class="panel">
					<a class="medium alert button" href="./index-step1.php">Client Information</a>
					<div class="description panel">
					<p>Keep clients information consolidated and keep track of other important data.</p>
					</div>
				</div>

				<div class="panel">
					<a class="medium alert button" href="./index-step2.php">Client Design Tool</a>
					<div class="description panel">
					<p>Allow interaction between the entire team and the client.</p>
					</div>
				</div>

				<div class="panel">
					<a class="medium alert button" href="./index-step3.php">Client Feedback Tool</a>
					<div class="description panel">
						<p>Ongoing feedback tool use to have a dynamic discussion area between the team and our clients.</p>
					</div>
				</div>

			</div>
		</div>
	</div>
<!--
- 2 unclosed <div>
- unclosed <body>
-->