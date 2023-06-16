var links = document.querySelectorAll("div#header a");
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomize(elem, num = 1) {
  var counter = parseInt(elem.dataset.counter);
  var str = "";
  const characters =
    "ABCDEFGHJIKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz[];:'@$%^&*()#~?,.<>-=+_!£";
  if ((counter + 1) / num > elem.dataset.text.length) {
    elem.innerText = elem.dataset.text;
    elem.dataset.counter = 0;
    return;
  }
  for (var i = 0; i < Math.floor(counter / num); i++) {
    str += elem.dataset.text.substr(i, 1);
  }
  for (var i = Math.floor(counter / num); i < elem.dataset.text.length; i++) {
    str += characters[getRandomInt(0, characters.length - 1)];
  }
  elem.dataset.counter = counter + 1;
  elem.innerText = str;
  setTimeout(randomize, 40, elem, num);
}
var completed = [];
var animation = null;
var curTimeout = null;
setInterval(() => {
  links = document.querySelectorAll("a");
  links.forEach((elem) => {
    if (completed.indexOf(elem.href) != -1) return;
    // Ignore elements which have been coloured (the animation removes colour)
    if (elem.href != "index.html" && elem.children.length == 0) {
      elem.dataset.text = elem.innerText;
      elem.dataset.counter = 0;
      elem.addEventListener("mouseenter", (_) => {
        if (elem.dataset.counter == 0) {
          randomize(elem);
        }
      });
    }
    if (elem.target != "_blank") {
      elem.addEventListener("click", (event) => {
        event.preventDefault();
        const href = elem.href;
        const trans = document.querySelector("div#transition");
        trans.style.display = "block";
        if (animation !== null) {
          animation.finish();
          clearTimeout(curTimeout);
        }
        animation = trans.animate([{ top: "-100%" }, { top: "0%" }], {
          duration: 750,
          iterations: 1,
          fill: "forwards",
          easing: "cubic-bezier(.22, .61, .36, 1)",
        });
        setTimeout(() => {
          if (window.location.href === elem.href) {
            const trans = document.querySelector("div#transition");
            trans.animate([{ top: "0%" }, { top: "100%" }], {
              duration: 750,
              iterations: 1,
              fill: "forwards",
              easing: "cubic-bezier(.22, .61, .36, 1)",
            });
            setTimeout(() => {
              trans.style.display = "none";
            }, 750);
            return;
          }
          window.location.href = href;
        }, 750);
      });
    }
    completed.push(elem.href);
  });
}, 100);
window.onload = () => {
  const trans = document.querySelector("div#transition");
  animation = trans.animate([{ top: "0%" }, { top: "100%" }], {
    duration: 750,
    iterations: 1,
    fill: "forwards",
    easing: "cubic-bezier(.22, .61, .36, 1)",
  });
  curTimeout = setTimeout(() => {
    trans.style.display = "none";
  }, 750);
};
