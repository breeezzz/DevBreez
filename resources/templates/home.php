<?php
	/*
		Any variables passed in through the variables parameter in our renderLayoutWithContentPage() function
		are available in here.
	*/
?>
<header>
	<!-- Home icon button -->
	<div class="home-icon">
	<a href="/"><img src="/webapp/public_html/img/icon-home.png"></a>
	</div>

	<!-- Title and information area -->
	<div class="row">
		<div id="header-information" class="large-8 columns">

			<h2>[DevBreez]Tools</h2>
            <hr>
		</div>
	</div>
</header>
		<div class="row">
			<div class="large-8 columns">

			<h3>The Information Station</h3>

				<div class="panel">
					<p>First incantation of the <a href=
					"https://github.com/breeezzz/DevBreez">Breez Development tool</a> -
					an Open Source web application available on GitHub. It's been
					created to bridge the developer/client gap and assist in project
					and content management.</p>
					<p>Please report any bugs to the <a href=
					"mailo:brz1080@gmail.com">admin.</a></p>
				</div>

				<div class="panel">
					<a class="tool-selection medium alert button" href="../public_html/page.php">Client Home</a>
					<div class="description panel">
					<p>Main area for clients once they log in.</p>
					</div>
				</div>

				<div class="panel">
					<a class="tool-selection medium alert button" href="../public_html/page-1.php">Client Information</a>
					<div class="description panel">
					<p>Keep clients information consolidated and keep track of other important data.</p>
					</div>
				</div>

				<div class="panel">
					<a class="tool-selection medium alert button" href="../public_html/page-2.php">Client Design Tool</a>
					<div class="description panel">
					<p>Allow interaction between the entire team and the client.</p>
					</div>
				</div>

				<div class="panel">
					<a class="tool-selection medium alert button" href="../public_html/page-3.php">Client Feedback Tool</a>
					<div class="description panel">
						<p>Ongoing feedback tool use to have a dynamic discussion area between the team and our clients.</p>
					</div>
				</div>
	</div>

<?php	require_once(TEMPLATES_PATH . "/sidebar.php"); ?>