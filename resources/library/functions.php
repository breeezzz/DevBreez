<?php
//*	###	[BreezDev]	###
//* Functions File
//* Description: This is the file used to build the segments of the web application independantly.
//* Version: 1.0.0.


//*** [Load Site Template]
	require_once(realpath(dirname(__FILE__) . "/../config.php"));

	function renderLayoutWithContentFile($contentFile, $variables = array())
	{
		$contentFileFullPath = TEMPLATES_PATH . "/" . $contentFile;
		// making sure passed in variables are in scope of the template
		// each key in the $variables array will become a variable
		if (count($variables) > 0) {
			foreach ($variables as $key => $value) {
				if (strlen($key) > 0) {
					${$key} = $value;
				}
			}
		}
	
		require_once(TEMPLATES_PATH . "/header.php");	
			if (file_exists($contentFileFullPath)) {
				require_once($contentFileFullPath);
			} 
				else {
					require_once(TEMPLATES_PATH . "/error.php");
					/*
					If the file isn't found the error can be handled in lots of ways.
					In this case we will just include an error template.
					*/
				}	
		require_once(TEMPLATES_PATH . "/sidebar.php");
		require_once(TEMPLATES_PATH . "/footer.php");
		require_once(TEMPLATES_PATH . "/admin.php");
	}
?>
<?php
//###	[General Functions]

	//# Displays lines out of README.txt.
	function get_current_version() {
		$file_readme = file(LIBRARY_PATH . "/README.txt");
		//displays version number
		echo $file_readme[1];
	}

	//#  Displays when README.txt was last modified.
	function get_version_modified() {
		$file_name = LIBRARY_PATH . "/README.txt";
			if (file_exists($file_name)) {
				echo date ("F d, Y", filemtime($file_name));
			}
	}

	//# Gets projects github address.
	function get_git() {
			$github = "https://github.com/breeezzz/BreezDev";
			echo $github;
	}
?>