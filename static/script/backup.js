if (window.location.host === "backup.whitetxt.dev") {
    const clips = document.querySelector("a[href='clips.php']");
    clips.href = "/clips.html";
    if (window.location.search.includes("?d=1")) {
        const hero = document.createElement("div");
        hero.id = "backuphero";
        hero.classList.add("hero", "bg-base-200", "min-h-[50vh]", "absolute", "left-1/2", "top-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "w-1/2");
        hero.innerHTML = `
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Whoops!</h1>
      <p class="pt-6">
        Sorry! My host is down at the moment, so you've been redirected to a backup!
      </p>
      <p class="pb-6">
        Check if whitetxt.dev is back up by visiting <a href="https://whitetxt.dev">clicking here</a>.
      </p>
      <button class="btn btn-primary" onclick="closeBackupHero()">Close</button>
    </div>
  </div>`;
        document.body.appendChild(hero);
    }
}

function closeBackupHero() {
    document.querySelector("#backuphero").remove();
}