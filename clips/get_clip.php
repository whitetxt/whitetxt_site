<?php
if (empty($_GET["file"])) {
    die(json_encode(["status" => "fail", "msg" => "Missing file."]));
}

$target_dir = "D:/clips/";
$location = $target_dir . basename($_GET["file"]);

if (!file_exists($location)) {
    die(json_encode(["status" => "fail", "msg" => "File not found."]));
} else if (stripos($location, "..") !== false) {
    die(json_encode(["status" => "fail", "msg" => "Relative positions are not allowed."]));
}

header("Content-Type: video/mp4");
header("Content-Length: " . filesize($location));
readfile($location);
return;