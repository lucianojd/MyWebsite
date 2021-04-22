<!DOCTYPE html>
<html lang="en">
	<head>
		<title>lucianod</title>
		<link rel="shortcut icon" src="/favicon.ico">
		<link rel="stylesheet" href="/index.css">
		<script src="/scripts/jquery-3.6.0.min.js"></script>
		<meta charset="utf-8">
	</head>
	<!--Body background image is from Toptal Subtle Patterns: https://www.toptal.com/designers/subtlepatterns/prism/-->
	<body>
		<header><h1>lucianod.me</h1></header>
		<?php
			class Button {
				private $name;
				private $id;

				function __construct($name, $id) {
					$this->name = $name;
					$this->id = $id;
				}

				function name() {
					return $this->name;
				}

				function id() {
					return $this->id;
				}
			}

			$buttons[0] = new Button("Home", "home");
			$buttons[1] = new Button("Education", "education");
			$buttons[2] = new Button("Experience", "experience");
			$buttons[3] = new Button("Interests", "interests");
			$buttons[4] = new Button("Projects", "projects");

			echo "<nav>";
			for ($i = 0; $i < count($buttons); $i++) {
				echo "<ul><li><a href=javascript:openPage(\"" . $buttons[$i]->id() . "\");>" . $buttons[$i]->name() . "</a></li></ul>";
			}
			echo "</nav>";
		?>
		<main></main>
		<script>
			function openPage(id) {
				$("main").load("/subpages/"+id+".php");
			}
			openPage("home");
		</script>
	</body>
</html>
