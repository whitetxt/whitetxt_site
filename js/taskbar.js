const taskbar = document.querySelector("div#taskbar");
const template_taskbar_item = taskbar.querySelector("div.template.item");

function create_taskbar_item(name, icon, window_id) {
    var new_item = template_taskbar_item.cloneNode(true);
    new_item.classList.remove("template");
    new_item.querySelector("span").innerText = name;
    new_item.querySelector("img").src = icon;
    new_item.dataset.window_id = window_id;
    new_item.addEventListener("click", function() {
        windows_open[new_item.dataset.window_id].style.opacity = "1";
        windows_open[new_item.dataset.window_id].dataset.min = "no";
    }.bind(new_item));
    taskbar.appendChild(new_item);
}

function remove_taskbar_item(window_id) {
    const taskbar_items = taskbar.querySelectorAll("div.item:not(.template)");
    for (var i = 0; i < taskbar_items.length; i++) {
        const item = taskbar_items[i];
        if (item.dataset.window_id != window_id) {
            continue;
        }
        taskbar.removeChild(item);
        delete windows_open[window_id];
    }
}