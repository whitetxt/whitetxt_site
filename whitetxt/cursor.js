const cursor = document.createElement("div");
document.body.appendChild(cursor);
cursor.id = "cursor";
var started = false;
cursor.style.opacity = "0";
window.addEventListener("mousemove", (event) => {
  const x = event.x;
  const y = event.y;
  if (!started) {
    cursor.animate(
      { opacity: "1" },
      { duration: 250, iterations: 1, fill: "forwards" }
    );
    cursor.style.top = `${y}px`;
    cursor.style.left = `${x}px`;
    started = true;
  }
  cursor.animate(
    { top: `${y}px`, left: `${x}px` },
    {
      duration: 100,
      iterations: 1,
      fill: "forwards",
    }
  );
});
