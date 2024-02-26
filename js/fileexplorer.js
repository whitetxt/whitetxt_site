const template_filepicker = document.querySelector("div.template.filepicker");

function openFilePicker(title = "Pick a File") {
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
  places.querySelector(".computer").addEventListener(
    "click",
    function () {
      change_picker_dir(this, "/Users/whtxt");
    }.bind(new_picker)
  );
  places.querySelector(".docs").addEventListener(
    "click",
    function () {
      change_picker_dir(this, "/Users/whtxt/Documents");
    }.bind(new_picker)
  );
  places.querySelector(".photos").addEventListener(
    "click",
    function () {
      change_picker_dir(this, "/Users/whtxt/Pictures");
    }.bind(new_picker)
  );
  places.querySelector(".music").addEventListener(
    "click",
    function () {
      change_picker_dir(this, "/Users/whtxt/Music");
    }.bind(new_picker)
  );
  places.querySelector(".videos").addEventListener(
    "click",
    function () {
      change_picker_dir(this, "/Users/whtxt/Videos");
    }.bind(new_picker)
  );

  new_picker.addEventListener(
    "click",
    function () {
      focus_window(this.dataset.window_id);
    }.bind(new_picker)
  );

  windows_open[++last_window_id] = new_picker;
  new_picker.dataset.window_id = last_window_id;
  new_picker.id = last_window_id;
  create_taskbar_item(title, "assets/appicons/mycomputer.png", last_window_id);
  focus_window(last_window_id);
  desktop.appendChild(new_picker);
}

function change_picker_dir(element, dir) {}

openFilePicker();
