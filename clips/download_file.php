<?php
if (empty($_GET["file"])) {
    die("No file specified.");
}

$target_dir = "D:/clips/";
$location = $target_dir . basename($_GET["file"]);

if (!file_exists($location)) {
    die("File not found.");
} else if (stripos($location, "..") !== false) {
    die("Relative positions are not allowed.");
}

header($_SERVER["SERVER_PROTOCOL"] . " 200 OK");
header("Content-Transfer-Encoding: Binary");
header("Content-Length:" . filesize($location));
header("Content-Disposition: attachment; filename=" . basename($_GET["file"]));
readfile($location);
return;