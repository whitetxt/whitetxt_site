const includes = document.querySelectorAll("include");
includes.forEach((elem) => {
  const url = elem.innerText;
  fetch(url)
    .then((resp) => {
      return resp.text();
    })
    .then((data) => {
      elem.innerHTML = data;
    });
});
