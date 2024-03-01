const template_filepicker = document.querySelector("div.template.filepicker");

var on_selects = {};

function openFilePicker(on_select, title = "Pick a File") {
  new_picker = template_filepicker.cloneNode(true);
  new_picker.classList.remove("template");
  const head = new_picker.querySelector("div.header");
  head.addEventListener(
    "mousedown",
    function () {
      selected_element = this;
      selected_defaultW = "680px";
      selected_defaultH = "540px";
    }.bind(new_picker)
  );
  head.addEventListener("mouseup", () => {
    selected_element = null;
  });

  head.querySelector(".minimizebutton").addEventListener(
    "click",
    function () {
      this.dataset.mini = "yes";
      this.style.opacity = "0";
    }.bind(new_picker)
  );
  head.querySelector(".maximizebutton").addEventListener(
    "click",
    function () {
      this.dataset.max = "yes";
      this.style.width = "100%";
      this.style.height = "calc(100% - 31px)";
      this.style.top = "0";
      this.style.left = "0";
    }.bind(new_picker)
  );
  head.querySelector(".quitbutton").addEventListener(
    "click",
    function () {
      this.parentElement.removeChild(this);
      remove_taskbar_item(this.dataset.window_id);
    }.bind(new_picker)
  );

  head.querySelector(".title").innerText = title;

  const places = new_picker.querySelector("div.places");
  setupFileBrowserPlaces(new_picker, places);

  new_picker.addEventListener(
    "click",
    function () {
      focus_window(this.dataset.window_id);
    }.bind(new_picker)
  );

  new_picker.querySelector("div.button.select").addEventListener(
    "click",
    function () {
      const filepath = this.querySelector("input.file").dataset.path;
      if (filepath === undefined) {
        return;
      }
      const file_contents = fs.readFile(filepath);
      on_selects[this.dataset.window_id](filepath, file_contents);
    }.bind(new_picker)
  );

  windows_open[++last_window_id] = new_picker;
  new_picker.dataset.window_id = last_window_id;
  new_picker.id = last_window_id;
  create_taskbar_item(title, "assets/appicons/mycomputer.png", last_window_id);
  focus_window(last_window_id);
  desktop.appendChild(new_picker);
  change_browser_dir(new_picker, "/Users/whtxt");
  on_selects[last_window_id] = on_select;
}

function setupFileBrowserPlaces(fb, places) {
  places.querySelector(".computer").addEventListener(
    "click",
    function () {
      change_browser_dir(this, "/Users/whtxt");
    }.bind(fb)
  );
  places.querySelector(".docs").addEventListener(
    "click",
    function () {
      change_browser_dir(this, "/Users/whtxt/Documents");
    }.bind(fb)
  );
  places.querySelector(".photos").addEventListener(
    "click",
    function () {
      change_browser_dir(this, "/Users/whtxt/Photos");
    }.bind(fb)
  );
  places.querySelector(".music").addEventListener(
    "click",
    function () {
      change_browser_dir(this, "/Users/whtxt/Music");
    }.bind(fb)
  );
  places.querySelector(".videos").addEventListener(
    "click",
    function () {
      change_browser_dir(this, "/Users/whtxt/Videos");
    }.bind(fb)
  );
}

function change_browser_dir(element, orig_dir) {
  const dir = fs.parsePath(orig_dir);
  const items = fs.getFSDir(dir);
  const files = element.querySelector("div.files");
  var children = [...files.children];
  for (var i = 0; i < children.length; i++) {
    if (children[i].classList.contains("file")) {
      children[i].parentElement.removeChild(children[i]);
    }
  }

  if (orig_dir !== "/") {
    var file = document.createElement("div");
    file.classList.add("file");
    var name = document.createElement("span");
    name.classList.add("name");
    name.innerText = "Back";
    file.appendChild(name);
    var type = document.createElement("span");
    type.classList.add("type");
    type.innerText = "Folder";
    file.appendChild(type);
    var size = document.createElement("span");
    size.classList.add("size");
    size.innerText = "0 B";
    file.appendChild(size);
    var old_dir = orig_dir.split("/");
    old_dir.pop();
    old_dir = old_dir.join("/");
    if (old_dir === "") {
      old_dir = "/";
    }
    file.addEventListener(
      "click",
      function () {
        change_browser_dir(this, old_dir);
      }.bind(element)
    );
    files.appendChild(file);
  }
  Object.entries(items).forEach((arr) => {
    var k = arr[0];
    var v = arr[1];
    const file = document.createElement("div");
    file.classList.add("file");
    const name = document.createElement("span");
    name.classList.add("name");
    name.innerText = k;
    file.appendChild(name);
    const type = document.createElement("span");
    type.classList.add("type");
    if (typeof v === "object") {
      type.innerText = "Folder";
    } else {
      type.innerText = "File";
    }
    file.appendChild(type);
    const size = document.createElement("span");
    size.classList.add("size");
    if (typeof v === "object") {
      size.innerText = "0 B";
    } else {
      size.innerText = "3 KB";
    }
    file.appendChild(size);
    if (typeof v === "object") {
      file.addEventListener(
        "click",
        function () {
          change_browser_dir(
            this,
            orig_dir + (orig_dir[orig_dir.length - 1] !== "/" ? "/" : "") + k
          );
        }.bind(element)
      );
    } else {
      const filepath =
        orig_dir + (orig_dir[orig_dir.length - 1] !== "/" ? "/" : "") + k;
      file.addEventListener(
        "click",
        function () {
          this.querySelector("input.file").value = k;
          this.querySelector("input.file").dataset.path = filepath;
        }.bind(element)
      );
    }
    files.appendChild(file);
  });
  element.querySelector("span.addr").innerText = "C:" + orig_dir;
}

const template_filebrowser = document.querySelector("div.template.filebrowser");
function openFileBrowser(start_dir = "/Users/whtxt") {
  new_fb = template_filebrowser.cloneNode(true);
  new_fb.classList.remove("template");
  const head = new_fb.querySelector("div.header");
  head.addEventListener(
    "mousedown",
    function () {
      selected_element = this;
      selected_defaultW = "680px";
      selected_defaultH = "540px";
    }.bind(new_fb)
  );
  head.addEventListener("mouseup", () => {
    selected_element = null;
  });

  head.querySelector(".minimizebutton").addEventListener(
    "click",
    function () {
      this.dataset.mini = "yes";
      this.style.opacity = "0";
    }.bind(new_fb)
  );
  head.querySelector(".maximizebutton").addEventListener(
    "click",
    function () {
      this.dataset.max = "yes";
      this.style.width = "100%";
      this.style.height = "calc(100% - 31px)";
      this.style.top = "0";
      this.style.left = "0";
    }.bind(new_fb)
  );
  head.querySelector(".quitbutton").addEventListener(
    "click",
    function () {
      this.parentElement.removeChild(this);
      remove_taskbar_item(this.dataset.window_id);
    }.bind(new_fb)
  );

  const places = new_fb.querySelector("div.places");
  setupFileBrowserPlaces(new_fb, places);

  new_fb.addEventListener(
    "click",
    function () {
      focus_window(this.dataset.window_id);
    }.bind(new_fb)
  );

  windows_open[++last_window_id] = new_fb;
  new_fb.dataset.window_id = last_window_id;
  new_fb.id = last_window_id;
  create_taskbar_item(
    "File Browser",
    "assets/appicons/mycomputer.png",
    last_window_id
  );
  focus_window(last_window_id);
  desktop.appendChild(new_fb);
  change_browser_dir(new_fb, start_dir);
}
