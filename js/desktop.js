var error_x = window.innerWidth / 2;
var error_y = window.innerHeight / 2;
const desktop = document.querySelector("div#desktop");
const template_error = document.querySelector("div.template.error");
function error(title, msg, buttons, icon) {
    new_error = template_error.cloneNode(true);
    new_error.classList.remove("template");
    new_error.querySelector("span.title").innerText = title;
    new_error.querySelector("span.text").innerText = msg;
    new_error.style.left = `${error_x}px`;
    new_error.style.top = `${error_y}px`;
    for (var i = 0; i < buttons.length; i++) {
        const button = document.createElement("div");
        button.classList.add("button");
        button.innerText = buttons[i];
        button.addEventListener("click", function () {
            remove_taskbar_item(this.dataset.window_id);
            desktop.removeChild(this);
        }.bind(new_error));
        new_error.querySelector("div.buttons").appendChild(button);
    }
    new_error.querySelector(".icon").src = icon ? `assets/icons/${icon}` : `assets/icons/error.png`;
    error_x += 30;
    error_y += 30;
    if (error_x > 27 * window.innerWidth / 32) {
        error_x = 3 * window.innerWidth / 32;
    }
    if (error_y > 27 * window.innerHeight / 32) {
        error_y = 3 * window.innerHeight / 32;
    }
    const header = new_error.querySelector("div.header");
    header.addEventListener("mousedown", function (e) {
        selected_element = this;
        selected_defaultW = "unset";
        selected_defaultH = "unset";
    }.bind(new_error));
    header.addEventListener("mouseup", () => {
        selected_element = null;
    });

    new_error.addEventListener("click", function() {
        focus_window(this.dataset.window_id);
      }.bind(new_error));
    
    windows_open[++last_window_id] = new_error;
    new_error.dataset.window_id = last_window_id;
    new_error.id = last_window_id;
    create_taskbar_item(title, icon ? `assets/icons/${icon}` : `assets/icons/error.png`, last_window_id);
    focus_window(last_window_id);
    desktop.appendChild(new_error);
}

var selected_element = null;
var selected_offsetX = 0;
var selected_offsetY = 0;
var selected_defaultW = 0;
var selected_defaultH = 0;
window.addEventListener("mousemove", (e) => {
    if (selected_element === null) {
        return;
    }
    focus_window(selected_element.dataset.window_id);
    selected_element.style.width = selected_defaultW;
    selected_element.style.height = selected_defaultH;
    selected_element.dataset.max = "no";
    selected_offsetX = selected_element.clientWidth / 2;
    selected_offsetY = 15;
    selected_element.style.left = `${e.clientX - selected_offsetX}px`;
    selected_element.style.top = `${e.clientY - selected_offsetY}px`;
});
window.addEventListener("mouseup", () => {
    selected_element = null;
});
window.addEventListener("keydown", (e) => {
    if (focused_window !== -1) {
        windows_open[focused_window].keydown(e);
    }
});

var last_window_id = -1;
var windows_open = {};
var focused_window = -1;

function focus_window(window_id) {
    for (var key in windows_open) {
        const window = windows_open[key];
        var zindex = parseInt(window.style.zIndex) - 1;
        zindex = zindex < 10 ? 10 : zindex;
        if (key != window_id) {
            window.style.zIndex = zindex.toString();
        } else {
            window.style.zIndex = "100";
        }
    }
    focused_window = window_id;
}