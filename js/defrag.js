const template_defrag = document.querySelector("div.template.defrag");

var defrag_windows = {};
const directions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function openDefrag(file = null) {
  new_defrag = template_defrag.cloneNode(true);
  new_defrag.classList.remove("template");
  const head = new_defrag.querySelector("div.header");
  head.addEventListener(
    "mousedown",
    function () {
      selected_element = this;
      selected_defaultW = "680px";
      selected_defaultH = "540px";
    }.bind(new_defrag)
  );
  head.addEventListener("mouseup", () => {
    selected_element = null;
  });
  head.querySelector(".minimizebutton").addEventListener(
    "click",
    function () {
      this.dataset.mini = "yes";
      this.style.opacity = "0";
    }.bind(new_defrag)
  );
  head.querySelector(".maximizebutton").addEventListener(
    "click",
    function () {
      this.dataset.max = "yes";
      this.style.width = "100%";
      this.style.height = "calc(100% - 31px)";
      this.style.top = "0";
      this.style.left = "0";
    }.bind(new_defrag)
  );
  head.querySelector(".quitbutton").addEventListener(
    "click",
    function () {
      this.parentElement.removeChild(this);
      remove_taskbar_item(this.dataset.window_id);
    }.bind(new_defrag)
  );

  // Generate squares
  const square_div = new_defrag.querySelector("div.squares");
  const width = 40;
  const height = 20;
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      const sq = document.createElement("div");
      sq.classList.add("square");
      square_div.appendChild(sq);
    }
  }

  new_defrag.addEventListener(
    "click",
    function () {
      focus_window(this.dataset.window_id);
    }.bind(new_defrag)
  );

  new_defrag.querySelector("div.start").addEventListener(
    "click",
    function () {
      start_defrag(this.dataset.window_id);
    }.bind(new_defrag)
  );

  new_defrag.querySelector("div.quit").addEventListener(
    "click",
    function () {
      stop_defrag(this.dataset.window_id);
      this.parentElement.removeChild(this);
      remove_taskbar_item(this.dataset.window_id);
    }.bind(new_defrag)
  );

  windows_open[++last_window_id] = new_defrag;
  windows_open[last_window_id].keydown = function (e) {
    defrag_keypress(this.dataset.window_id, e);
  }.bind(new_defrag);
  new_defrag.dataset.window_id = last_window_id;
  new_defrag.id = last_window_id;
  create_taskbar_item(
    "Disk Defragmenter",
    "assets/appicons/defrag.png",
    last_window_id
  );
  focus_window(last_window_id);
  desktop.appendChild(new_defrag);
}

function start_defrag(window_id) {
  stop_defrag(window_id);
  setTimeout(() => {
    windows_open[window_id].querySelector("span.defrag-prog").innerText = `0%`;
    windows_open[window_id].querySelector("span.data").style.display =
      "inline-block";
    windows_open[window_id].querySelector("span.defrag-prog").style.display =
      "inline-block";
    windows_open[window_id].querySelector("span.status").innerHTML = "";
    defrag_windows[window_id] = {
      completed: [],
      length: 5,
      snake: [
        [0, 0],
        [0, 0],
      ],
      direction: 0,
      quit: false,
      fruit: [20, 10],
    };
    const squares = windows_open[window_id].querySelectorAll("div.square");
    for (var i = 0; i < squares.length; i++) {
      squares[i].classList.remove("snake");
      squares[i].classList.remove("completed");
      if (i == 420) {
        squares[i].classList.add("fruit");
      }
    }
    setTimeout(perform_defrag, 50, window_id);
  }, 250);
}

function perform_defrag(window_id) {
  if (!(window_id in windows_open)) {
    return;
  }
  if (defrag_windows[window_id]["quit"]) {
    return;
  }
  const squares = windows_open[window_id].querySelectorAll("div.square");
  for (var i = 0; i < defrag_windows[window_id]["snake"].length; i++) {
    const snake = defrag_windows[window_id]["snake"][i];
    squares[snake[0] + snake[1] * 40].classList.remove("snake");
  }
  defrag_windows[window_id]["snake"].shift();
  const snake = defrag_windows[window_id]["snake"];
  var head =
    defrag_windows[window_id]["snake"][
      defrag_windows[window_id]["snake"].length - 1
    ];
  var new_head = [...head];
  new_head[0] += directions[defrag_windows[window_id]["direction"]][0];
  new_head[1] += directions[defrag_windows[window_id]["direction"]][1];
  new_head[0] %= 40;
  new_head[1] %= 20;
  if (new_head[0] < 0) {
    new_head[0] += 40;
  }
  if (new_head[1] < 0) {
    new_head[1] += 20;
  }
  if (snake.some((a) => new_head.every((v, i) => v === a[i]))) {
    defrag_windows[window_id]["snake"].push(new_head);
    for (var i = 0; i < defrag_windows[window_id]["snake"].length; i++) {
      const snake = defrag_windows[window_id]["snake"][i];
      squares[snake[0] + snake[1] * 40].classList.add("snake");
      squares[snake[0] + snake[1] * 40].classList.add("dead");
    }
    windows_open[window_id].querySelector("span.data").style.display = "none";
    windows_open[window_id].querySelector("span.defrag-prog").style.display =
      "none";
    windows_open[window_id]
      .querySelector("span.status")
      .classList.remove("win");
    windows_open[window_id].querySelector("span.status").classList.add("lose");
    windows_open[window_id].querySelector("span.status").innerHTML =
      "Defragmentation Failed:<br>Hard Drive Disk Platters Collapsed.";
    return;
  }
  defrag_windows[window_id]["snake"].push(new_head);
  const fruit = defrag_windows[window_id]["fruit"];
  if (snake.some((a) => fruit.every((v, i) => v === a[i]))) {
    const current_index = fruit[0] + fruit[1] * 40;
    squares[current_index].classList.add("completed");
    squares[current_index].classList.remove("fruit");
    defrag_windows[window_id]["completed"].push([...fruit]);
    var indexes = [];
    for (var i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains("snake")) {
        continue;
      }
      if (squares[i].classList.contains("completed")) {
        continue;
      }
      indexes.push(i);
    }
    if (indexes.length === 0) {
      const num_comp = defrag_windows[window_id]["completed"].length;
      windows_open[window_id].querySelector(
        "span.defrag-prog"
      ).innerText = `${Math.floor((num_comp * 100) / (40 * 20))}%`;
      for (var i = 0; i < squares.length; i++) {
        squares[i].classList.add("win");
        squares[i].classList.remove("dead");
        squares[i].classList.remove("snake");
        squares[i].classList.remove("completed");
        squares[i].style.animationDelay = `-${
          Math.round(Math.random() * 50) * 10
        }ms`;
      }
      windows_open[window_id].querySelector("span.data").style.display = "none";
      windows_open[window_id].querySelector("span.defrag-prog").style.display =
        "none";
      windows_open[window_id].querySelector("span.status").innerHTML =
        "Defragmentation has been completed!";
      windows_open[window_id].querySelector("span.status").classList.add("win");
      windows_open[window_id]
        .querySelector("span.status")
        .classList.remove("lose");
      return;
    } else {
      const index = indexes[Math.floor(Math.random() * indexes.length)];
      defrag_windows[window_id]["fruit"][1] = Math.floor(index / 40);
      defrag_windows[window_id]["fruit"][0] = index % 40;
      squares[index].classList.add("fruit");
      defrag_windows[window_id]["snake"].unshift([
        ...defrag_windows[window_id]["snake"][0],
      ]);
      console.log(defrag_windows[window_id]["fruit"]);
    }
  }
  for (var i = 0; i < defrag_windows[window_id]["snake"].length; i++) {
    const snake = defrag_windows[window_id]["snake"][i];
    squares[snake[0] + snake[1] * 40].classList.add("snake");
  }
  const num_comp = defrag_windows[window_id]["completed"].length;
  windows_open[window_id].querySelector(
    "span.defrag-prog"
  ).innerText = `${Math.floor((num_comp * 100) / (40 * 20))}%`;
  setTimeout(perform_defrag, 50, window_id);
}

function stop_defrag(window_id) {
  if (window_id in defrag_windows) {
    defrag_windows[window_id]["quit"] = true;
  }
}

function defrag_keypress(window_id, event) {
  if (event.keyCode < 37 || event.keyCode > 40) {
    return;
  }
  switch (event.keyCode) {
    case 37:
      if (defrag_windows[window_id]["direction"] !== 0) {
        defrag_windows[window_id]["direction"] = 2;
      }
      break;
    case 38:
      if (defrag_windows[window_id]["direction"] !== 1) {
        defrag_windows[window_id]["direction"] = 3;
      }
      break;
    case 39:
      if (defrag_windows[window_id]["direction"] !== 2) {
        defrag_windows[window_id]["direction"] = 0;
      }
      break;
    case 40:
      if (defrag_windows[window_id]["direction"] !== 3) {
        defrag_windows[window_id]["direction"] = 1;
      }
      break;
    default:
      break;
  }
}
