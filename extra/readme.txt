[BreezDev]

/*** FILE STRUCTURE ***/

The parent directory, “webapp”, is where all files that do not need to be accessed by a Web browser will reside.

The names of these directories are clear and meaningful and reside in the proper locations. In a product intended for repeat use, files outside of the public Web directory would be stored in a centralized location on the server and accessed by project scripts at that location either directly or by creating symbolic links (shortcuts in Windows) to those directories.

/* Linking to localroot

ex. <a href="/../internal/login/login.html">Test</a>


/*** NAMING CONVENTIONS ***/

The two most common conventions for file naming are “word separation” and “camel caps”. 

ex1) An example of word spacing would be a file named “new_member_signup.php”. 

ex2) An example of a file named with camel caps would be “newMemberSignup.php”. 

*** It is my opinion that camel caps is the appropriate convention in all situations and that neither files nor directories should begin with capital letters. Using this convention makes it easy to read file and directory names quickly and it is also simple to retype them, which is not the case when using word spacing.

It is also good to avoid file names that are redundant with the name of the directory containing them. You would not name a string function library “lib.string.php” and place it in the lib directory – if it is in the lib directory in the first place, you know that the file will be a function library – “string.php” will suffice. The same rule applies to class files, configuration files, etc. All in all, the conventions for the physical application are quite simple and easy to remember.


// When should I use require_once vs include?

1) The require() function is identical to include(), except that it handles errors differently. If an error occurs, the include() function generates a warning, but the script will continue execution. The require() generates a fatal error, and the script will stop.

*** 2) The require_once() statement is identical to require() except PHP will check if the file has already been included, and if so, not include (require) it again.

// How to link html pages in same or different folders?

Within the same folder, just use the file name:
<a href="thefile.html">my link</a>
	ROOT/thefile.html

You can go up a folder in the hierarchy by using:
<a href="../thefile.html">my link</a>
	ROOT/website/index.html
	-> ROOT/thefile.html

Within a sub-directory:
<a href="subdir/thefile.html">my link</a>
	ROOT/subdir/thefile.html

In addition, if you want to refer to the root directory, you can use (relative path):
<a href="/index.html">My Index Page</a>
	ROOT/index.html

To go up multiple directories you can do this:
<a href = "../../page.html">link</a>
	ROOT/webpage/links/index.html
	-> ROOT/page.html

To go the root, I use this:
<a href = "~/page.html">link</a>
	ROOT/webpage/links/index.html
	-> ROOT/page.html