<!DOCTYPE html>
<html>
<head>
    <title>Horse Quest: The Dawn of Beasts [BETA]</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>
    <script src="lib/crafty.js"></script>
    <script src="src/horseRacer.js.php"></script>
    <script>
        window.addEventListener('load', Game.start);
    </script>
    <style type="text/css" media="screen">
        body { background: black; }
        #log {
            position:absolute;
            right: 20px;
            width:200px;
            background-color: white;
            height:700px;
            overflow: auto;
        }
    </style>
</head>
<body>
<div id="log"></div>
</body>
</html>