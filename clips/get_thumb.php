<?php
if (empty($_GET["file"])) {
    die(json_encode(["status" => "fail", "msg" => "Missing file."]));
}

$target_dir = "/mnt/clips/";
$location = $target_dir . basename($_GET["file"]) . ".jpg";

if (!file_exists($location)) {
    die(json_encode(["status" => "fail", "msg" => "File not found."]));
} else if (stripos($location, "..") !== false) {
    die(json_encode(["status" => "fail", "msg" => "Relative positions are not allowed."]));
}

header("Content-Type: image/jpg");
header("Content-Length: " . filesize($location));
readfile($location);
return;
