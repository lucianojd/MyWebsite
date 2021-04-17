<!DOCTYPE html>
<html lang="en">
	<head>
		<title>lucianod</title>
		<meta charset="utf-8">
        <script type="text/javascript" src="/js/phaser.js"></script>
        <script type="text/javascript" src="/js/graph-utils.js"></script>
        <script type="text/javascript" src="/js/graph-gui.js"></script>
		<style>
            input {
                margin: auto;
                position: relative;
            }
			canvas {
				border-style: solid;
                margin: auto;
			}

            body {
                display: flex;
                flex-direction: column;
            }

            #controls {
                margin: auto;
            }
		</style>
	</head>
	<body>
            <div id="controls">
                <input type="button" onclick="addNode()" value="Add Node">
                <input type="button" onclick="deleteNode()" value="Delete Node">
            </div>
	</body>
</html>
