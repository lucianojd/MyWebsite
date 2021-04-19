<!DOCTYPE html>
<html lang="en">
	<head>
		<title>lucianod</title>
		<meta charset="utf-8">
        <script type="text/javascript" src="/js/phaser.js"></script>
        <script type="text/javascript" src="/js/graph.js"></script>
        <script type="text/javascript" src="/js/classes.js"></script>
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
                <input type="button" onclick="setAddNodeFlag()" value="Add Node">
                <input type="button" onclick="setDeleteNodeFlag()" value="Delete Node">
                <input type="button" onclick="setAddEdgeFlag()" value="Draw Edge">
            </div>
	</body>
</html>
