<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta property="og:site_name" content="_whitetxt's Clip Zone">
    <?php
    $keep = "files.json";
    $data = file_get_contents($keep);
    $obj = json_decode($data);
    $file = null;
    foreach ($obj->files as $f) {
        if ($f->name === $_GET["file"]) {
            $file = $f;
            break;
        }
    }
    if ($file === null) { ?>
        <!-- HTML Meta Tags -->
        <title>_whitetxt - clip zone - Unknown Clip</title>
        <meta name="description"
            content="_whitetxt's place to upload and share epic gamer moments! Unfortunately, this video seems to be missing...">

        <!-- Facebook Meta Tags -->
        <meta property="og:url" content="https://whitetxt.dev/clips.php">
        <meta property="og:type" content="website">
        <meta property="og:title" content="_whitetxt's clip zone - Unknown Clip">
        <meta property="og:description"
            content="_whitetxt's place to upload and share epic gamer moments! Unfortunately, this video seems to be missing...">
        <meta property="og:image" content="https://whitetxt.dev/static/img/notfound.png">
        <meta property="og:image:type" content="image/png">
        <meta property="og:image:width" content="1920">
        <meta property="og:image:height" content="1080">
        <meta property="og:video" content="https://whitetxt.dev/static/vid/notfound.mp4">
        <meta property="og:video:url" content="https://whitetxt.dev/static/vid/notfound.mp4">
        <meta property="og:video:type" content="video/mp4">
        <meta property="og:video:width" content="1280">
        <meta property="og:video:height" content="720">

        <!-- Twitter Meta Tags -->
        <meta name="twitter:card" content="player">
        <meta property="twitter:url" content="https://whitetxt.dev/clips.php">
        <meta name="twitter:title" content="_whitetxt's clip zone - Unknown Clip">
        <meta name="twitter:description"
            content="_whitetxt's place to upload and share epic gamer moments! Unfortunately, this video seems to be missing...">
        <meta name="twitter:image" content="https://whitetxt.dev/static/img/notfound.png">
        <meta name="twitter:player:width" content="1280">
        <meta name="twitter:player:height" content="720">
        <meta name="twitter:player" content=https://whitetxt.dev/static/vid/notfound.mp4">
    <?php } else {
        $_GET["file"] = htmlspecialchars($_GET["file"]); ?>
        <!-- HTML Meta Tags -->
        <title>_whitetxt - clip zone - <?= $f->readname ?></title>
        <meta name="description"
            content="_whitetxt's place to upload and share epic gamer moments! Watch `<?= $f->readname ?>` on here now!">

        <!-- Facebook Meta Tags -->
        <meta property="og:url" content="https://whitetxt.dev/clips/view_clip.php?file=<?= $_GET["file"] ?>">
        <meta property="og:title" content="_whitetxt's clip zone - <?= $f->readname ?>">
        <meta property=" og:type" content="video.other">
        <meta property="og:image" content="https://whitetxt.dev/clips/get_thumb.php?file=<?= $_GET["file"] ?>">
        <meta property="og:image:type" content="image/jpeg">
        <meta property="og:image:width" content="1920">
        <meta property="og:image:height" content="1080">
        <meta property="og:video" content="https://whitetxt.dev/clips/get_clip.php?file=<?= $_GET["file"] ?>">
        <meta property="og:video:url" content="https://whitetxt.dev/clips/get_clip.php?file=<?= $_GET["file"] ?>">
        <meta property="og:video:type" content="video/mp4">
        <meta property="og:video:width" content="1920">
        <meta property="og:video:height" content="1080">
        <meta property="og:description" content="_whitetxt' s place to upload and share epic gamer moments!
        Watch `<?= $f->readname ?>` on here now!">
        <meta property="og:image" content="https://whitetxt.dev/clips/get_thumb.php?file=<?= $_GET["file"] ?>">

        <!-- Twitter Meta Tags -->
        <meta name="twitter:card" content="player">
        <meta property="twitter:url" content="https://whitetxt.dev/clips/view_clip.php?file=<?= $_GET["file"] ?>">
        <meta name="twitter:title" content="_whitetxt's clip zone - <?= $f->readname ?>">
        <meta name="twitter:description" content="_whitetxt' s place to upload and share epic gamer moments!
        Watch `<?= $f->readname ?>` on here now!">
        <meta name="twitter:image" content="https://whitetxt.dev/clips/get_thumb.php?file=<?= $_GET["file"] ?>">
        <meta name="twitter:player:width" content="1920">
        <meta name="twitter:player:height" content="1080">
        <meta name="twitter:player" content="https://whitetxt.dev/clips/get_clip.php?file=<?= $_GET["file"] ?>">
    <?php } ?>
    <meta property="twitter:domain" content="whitetxt.dev">
    <link rel="stylesheet" href="../static/style/style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&display=swap">
</head>

<body class="h-screen flex flex-col items-center">
    <div class="flex flex-row justify-evenly items-center my-4 gap-8">
        <a class="btn text-xl" href="../clips.php">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
            Back
        </a>
        <span class="text-3xl font-bold">
            _whitetxt's Gaming Clip Zone
        </span>
    </div>
    <div class="card bg-base-100 w-3/4 shadow-xl mx-auto">
        <?php
        if ($file !== null) { ?>
            <figure>
                <video controls src="get_clip.php?file=<?= $_GET["file"] ?>"></video>
            </figure>
            <div class="card-body text-lg">
                <h2 class="card-title text-3xl font-bold"><?= $file->readname ?></h2>
                <p>Filename: <?= $file->name ?></p>
                <p>Size: <?= $file->filesize ?></p>
                <p>Upload Time: <?= $file->uploadtime ?></p>
                <div class="card-actions justify-end">
                    <a class="btn btn-primary" href="download_file.php?file=<?= $_GET["file"] ?>">Download</a>
                    <button class="btn btn-primary"
                        onclick="navigator.clipboard.writeText(window.location.href);alert('Copied!');">Share</button>
                </div>
            </div>
        <?php } else { ?>
            <figure>
                <img src="/static/img/notfound.png"></img>
            </figure>
            <div class="card-body text-lg">
                <h2 class="card-title text-3xl font-bold">Failed to find file information.</h2>
            </div>
        <?php } ?>
    </div>
</body>

</html>