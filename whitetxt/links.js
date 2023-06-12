const links = document.querySelectorAll("div#header a");
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomize(elem) {
  var counter = parseInt(elem.dataset.counter);
  var str = "";
  const num = 1;
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
  setTimeout(randomize, 40, elem);
}
links.forEach((elem) => {
  if (elem.innerText == "_whitetxt") {
    return;
  }
  elem.dataset.text = elem.innerText;
  elem.dataset.counter = 0;
  elem.dataset.start_letter = 0;
  elem.addEventListener("mouseenter", (_) => {
    if (elem.dataset.counter == 0) {
      randomize(elem);
    }
  });
});
