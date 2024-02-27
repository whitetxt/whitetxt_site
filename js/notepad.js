const template_notepad = document.querySelector("div.template.notepad");

function openNotepad(file = null) {
  new_notepad = template_notepad.cloneNode(true);
  new_notepad.classList.remove("template");
  const head = new_notepad.querySelector("div.header");
  head.addEventListener(
    "mousedown",
    function () {
      selected_element = this;
      selected_defaultW = "680px";
      selected_defaultH = "540px";
    }.bind(new_notepad)
  );
  head.addEventListener("mouseup", () => {
    selected_element = null;
  });

  head.querySelector(".minimizebutton").addEventListener(
    "click",
    function () {
      this.dataset.mini = "yes";
      this.style.opacity = "0";
    }.bind(new_notepad)
  );
  head.querySelector(".maximizebutton").addEventListener(
    "click",
    function () {
      this.dataset.max = "yes";
      this.style.width = "100%";
      this.style.height = "calc(100% - 31px)";
      this.style.top = "0";
      this.style.left = "0";
    }.bind(new_notepad)
  );
  head.querySelector(".quitbutton").addEventListener(
    "click",
    function () {
      this.parentElement.removeChild(this);
      remove_taskbar_item(this.dataset.window_id);
    }.bind(new_notepad)
  );

  new_notepad.querySelector("div.menuitem.save").addEventListener(
    "click",
    function () {
      notepadSave(this);
    }.bind(new_notepad)
  );
  new_notepad.querySelector("div.menuitem.load").addEventListener(
    "click",
    function () {
      notepadLoad(this);
    }.bind(new_notepad)
  );
  new_notepad.querySelector("div.menuitem.download").addEventListener(
    "click",
    function () {
      notepadDownload(this);
    }.bind(new_notepad)
  );
  new_notepad
    .querySelector("div.menuitem.help")
    .addEventListener("click", function () {
      openNotepadHelp();
    });

  new_notepad.addEventListener(
    "click",
    function () {
      focus_window(this.dataset.window_id);
    }.bind(new_notepad)
  );

  windows_open[++last_window_id] = new_notepad;
  new_notepad.dataset.window_id = last_window_id;
  new_notepad.id = last_window_id;
  create_taskbar_item("Notepad", "assets/appicons/notepad.png", last_window_id);
  focus_window(last_window_id);
  desktop.appendChild(new_notepad);
}

function notepadSave(base_div) {
  const text = base_div.querySelector(".editor .text").value;
  localStorage.setItem("notepad-text", text);
}

function notepadLoad(base_div) {
  var text = localStorage.getItem("notepad-text");
  if (text === null) {
    text = "";
  }
  base_div.querySelector(".editor .text").value = text;
}

function notepadDownload(base_div) {
  const text = base_div.querySelector(".editor .text").value;
  const blob = new Blob([text], { type: "text/plain" });
  const URL = window.URL.createObjectURL(blob);
  const filename = "notepad.txt";

  const downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = URL;
  downloadLink.onclick = () => {
    downloadLink.parentElement.removeChild(downloadLink);
  };
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
}

const template_notepadhelp = document.querySelector("div.template.notepadhelp");
function openNotepadHelp(file = null) {
  new_notepad = template_notepadhelp.cloneNode(true);
  new_notepad.classList.remove("template");
  const head = new_notepad.querySelector("div.header");
  head.addEventListener(
    "mousedown",
    function () {
      selected_element = this;
      selected_defaultW = "300px";
      selected_defaultH = "200px";
    }.bind(new_notepad)
  );
  head.addEventListener("mouseup", () => {
    selected_element = null;
  });

  head.querySelector(".minimizebutton").addEventListener(
    "click",
    function () {
      this.dataset.mini = "yes";
      this.style.opacity = "0";
    }.bind(new_notepad)
  );
  head.querySelector(".maximizebutton").addEventListener(
    "click",
    function () {
      this.dataset.max = "yes";
      this.style.width = "100%";
      this.style.height = "calc(100% - 31px)";
      this.style.top = "0";
      this.style.left = "0";
    }.bind(new_notepad)
  );
  head.querySelector(".quitbutton").addEventListener(
    "click",
    function () {
      this.parentElement.removeChild(this);
      remove_taskbar_item(this.dataset.window_id);
    }.bind(new_notepad)
  );

  new_notepad.addEventListener(
    "click",
    function () {
      focus_window(this.dataset.window_id);
    }.bind(new_notepad)
  );

  windows_open[++last_window_id] = new_notepad;
  new_notepad.dataset.window_id = last_window_id;
  new_notepad.id = last_window_id;
  create_taskbar_item(
    "Notepad - Help",
    "assets/appicons/notepad.png",
    last_window_id
  );
  desktop.appendChild(new_notepad);
  setTimeout(
    function () {
      focus_window(this);
    }.bind(last_window_id),
    0
  );
}
