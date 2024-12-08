const elem = document.createElement("div");
elem.id = "hostCheck";
elem.classList.add("absolute", "left-0", "top-0", "flex", "flex-row", "items-center", "p-4", "gap-4", "hidden");
elem.innerHTML = `<span class="loading loading-ring loading-sm" id="hostCheckLoading"></span>
<span id="hostCheckText" class="hidden 2xl:block">Checking if host is online...</span>`;
document.body.appendChild(elem);

const hostCheck = document.querySelector("#hostCheck");
const hostCheckLoading = document.querySelector("#hostCheckLoading");
const hostCheckText = document.querySelector("#hostCheckText");

if (window.location.host === "backup.whitetxt.dev") {
    const clips = document.querySelector("a[href='clips.php']");
    clips.href = "/clips.html";
    hostCheck.classList.remove("hidden");
    checkHost();
    setInterval(checkHost, 60 * 1000);
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
        Check if whitetxt.dev is back up by visiting <a href="https://whitetxt.dev" class="text-primary">clicking here</a>.
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

function checkHost() {
    hostCheckLoading.classList.remove("hidden");
    hostCheckText.innerText = "Checking if host is online...";
    fetch("https://whitetxt.dev/online_check.html").then((res) => {
        if (res.status !== 200) {
            // Host offline
            hostCheckLoading.classList.add("hidden");
            hostCheckText.innerText = "Host offline.";
            return;
        }
        // Host online
        hostCheckLoading.classList.add("hidden");
        hostCheckText.innerText = "Host is back online!";
        const hero = document.createElement("div");
        hero.id = "backuphero";
        hero.classList.add("hero", "bg-base-200", "min-h-[50vh]", "absolute", "left-1/2", "top-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "w-1/4");
        hero.innerHTML = `
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Hooray!</h1>
      <p class="pt-6 text-2xl">
        My host is back online! Please head over there: <a href="https://whitetxt.dev" class="text-primary">whitetxt.dev</a>
      </p>
    </div>
  </div>`;
        document.body.appendChild(hero);
    });
}