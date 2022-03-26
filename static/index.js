const root = document.querySelector(".root");
var host = location.origin.replace(/^http/, "ws");
const ws = new WebSocket(host);

let mousedown = false;

let counter;
let listeners = [];
let selected = [];

const cb = (e) => {
  console.log("ziuuuu");
  if (mousedown) {
    e.target.classList.add("selected");
    if (!selected.includes(e.target)) selected.push(e.target);
  }
};

ws.onmessage = (mes) => {
  listeners.forEach((l) => l.clear());
  while (listeners.length) listeners.pop();
  const availableSpots = handleMessage(mes);
  availableSpots.forEach((spot) => {
    spot.addEventListener("mousemove", cb);
    const clear = () => {
      spot.removeEventListener("mousemove", cb);
    };
    listeners.push({ clear });
  });
};

document.addEventListener("mousedown", (e) => {
  e.preventDefault();
  mousedown = true;
});
document.addEventListener("mouseup", () => {
  mousedown = false;
  selected.forEach((e) => e.classList.remove("selected"));
  console.log(selected.length);
  if (selected.length === 4) {
    root.append("success!");
  }
  while (selected.length) selected.pop();
});
