<?php
if (empty($_GET["file"])) {
	die(json_encode(array("status"=>"fail","msg"=>"Missing file.")));
}

$target_dir = "/mnt/drive/clips/";
$target_file = $target_dir . $_GET["file"] . ".jpg";

if (!file_exists($target_file)) {
	die(json_encode(array("status"=>"fail","msg"=>"File not found.")));
} else if (stripos($target_file, "..") !== false) {
	die(json_encode(array("status"=>"fail","msg"=>"Relative positions are not allowed.")));
}

header("Content-Type: image/jpg");
header("Content-Length: " . filesize($target_file));
readfile($target_file);
return;
?>