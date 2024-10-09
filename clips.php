<?php $clips = json_decode(file_get_contents(__DIR__ . "/clips/files.json")); ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>_whitetxt - clip zone</title>
    <link rel="stylesheet" href="style/style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="whitetxt" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://whitetxt.dev/clips.php" />
    <meta property="og:image" content="https://whitetxt.dev/static/img/favicon.png" />
    <meta property="og:description" content="_whitetxt's Clip Zone" />
    <!-- <meta name="theme-color" content="#e283d9"> -->
    <link rel="stylesheet" href="style/style.css">
</head>

<body class="h-screen flex flex-col items-center">
    <div class="max-w-[1280px] w-full h-full grid grid-cols-7 mt-4 px-4">
        <div id="nav" class="w-full flex flex-col items-center gap-4">
            <div class="tooltip tooltip-right" data-tip="Home">
                <a class="btn btn-sm btn-square" href="index.html">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </a>
            </div>
            <div class="tooltip tooltip-right" data-tip="Me">
                <a class="btn btn-sm btn-square" href="me.html">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </a>
            </div>
            <div class="tooltip tooltip-right" data-tip="Now">
                <a class="btn btn-sm btn-square" href="now.html">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </a>
            </div>
            <div class="tooltip tooltip-right" data-tip="Links">
                <a class="btn btn-sm btn-square" href="links.html">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                    </svg>
                </a>
            </div>
            <div class="tooltip tooltip-right" data-tip="Clips">
                <a class="btn btn-sm btn-square btn-active" href="clips.php">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                </a>
            </div>
            <div class="divider divider-horizontal flex-grow self-center"></div>
        </div>
        <div id="main" class="w-full col-span-6 mb-4">
            <div class="flex flex-row justify-evenly items-center mb-4">
                <span class="text-3xl font-bold">
                    _whitetxt's Gaming Clip Zone
                </span>
                <span class="text-xl">
                    Number of Clips: <?= count($clips->files) ?>
                </span>
                <span class="text-xl">
                    <label>
                        <div class="label">
                            <span class="label-text">Filter</span>
                        </div>
                        <select id="filter" class="select select-bordered select-sm max-w-xs "
                            onchange="changedFilter(this.value);">
                            <option value="all">All</option>
                            <?php
                            foreach ($clips->games as $game) { ?>
                            <option value="<?= $game ?>"><?= $game ?></option>
                            <?php } ?>
                        </select>
                    </label>
                </span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4" id="clips">
                <?php
                foreach ($clips->files as $clip) { ?>
                <div class="card bg-base-100 shadow-md shadow-neutral" game="<?= $clip->game ?>">
                    <figure>
                        <a href="clips/view_clip.php?file=<?= $clip->name ?>">
                            <img src="clips/get_thumb.php?file=<?= $clip->name ?>" alt="Video Thumbnail" />
                        </a>
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title"><?= $clip->readname ?></h2>
                        <p>Game - <?= $clip->game ?></p>
                        <div class="card-actions justify-end">
                            <a class="btn btn-primary">Download</a>
                            <a class="btn btn-primary">Share</a>
                        </div>
                    </div>
                </div>
                <?php } ?>
            </div>
        </div>
    </div>
</body>
<script>
var filter = "all";
const dir_items_element = document.querySelector("div#clips");

function changedFilter(new_f) {
    filter = new_f;
    for (let elem of dir_items_element.children) {
        if (filter !== "all" && elem.getAttribute("game") !== filter) {
            elem.classList.add("hidden");
        } else {
            elem.classList.remove("hidden");
        }
    }
}
</script>

</html>