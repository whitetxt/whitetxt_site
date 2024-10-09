<?php
if (empty($_GET["file"])) {
    die(json_encode(array("status" => "fail", "msg" => "Missing file.")));
}

$target_dir = "D:/clips/";
if (substr($_GET["file"], -4) !== ".mp4") {
    $target_file = $target_dir . $_GET["file"] . ".mp4";
} else {
    $target_file = $target_dir . $_GET["file"];
}

$target_file = realpath($target_file);

if (!file_exists($target_file)) {
    die(json_encode(array("status" => "fail", "msg" => "File not found.")));
} else if (stripos($target_file, "..") !== false) {
    die(json_encode(array("status" => "fail", "msg" => "Relative positions are not allowed.")));
}

header("Content-Type: video/mp4");
header("Content-Length: " . filesize($target_file));
readfile($target_file);
return;
