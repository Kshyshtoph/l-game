const root = document.querySelector(".root");
var host = location.origin.replace(/^http/, "ws");
let ws = new WebSocket(host);

let mousedown = false;
let phase = 1;

let counter;
let listeners = [];
let selected = [];
let boxes;

const cbPiece = (e, index) => {
  if (mousedown) {
    e.target.classList.add("selected");
    if (!selected.map(({ node }) => node).includes(e.target))
      selected.push({ node: e.target, index });
  }
};

ws.onmessage = (mes) => {
  listeners.forEach((l) => l.clear());
  while (listeners.length) listeners.pop();
  const availableSpots = handleMessage(mes);
  boxes = [...document.querySelectorAll(".box")];

  availableSpots.forEach((spot) => {
    const index = boxes.indexOf(spot);
    spot.addEventListener("mousemove", (e) => cbPiece(e, index));
    const clear = () => {
      spot.removeEventListener("mousemove", (e) => cbPiece(e, index));
    };
    listeners.push({ clear });
  });

  const tokenBoxes = [...document.querySelectorAll(".box")].filter(
    (e) => e.children.length
  );

  tokenBoxes.forEach((box) => {
    box.addEventListener("click", () => cbSelectToken(box));
    listeners.push({
      clear: () => box.removeEventListener("click", () => cbSelectToken(box)),
    });
  });
};

document.addEventListener("mousedown", (e) => {
  e.preventDefault();
  mousedown = true;
});
document.addEventListener("mouseup", () => {
  mousedown = false;
  selected.forEach(({ node }) => node.classList.remove("selected"));
  selected.sort((a, b) => a.index - b.index);

  if (phase === 1 && checkValid(selected.map(({ index }) => index))) {
    ws.send(JSON.stringify({ type: messages.SEND_MOVE, counter, selected }));
    phase = 2;
  }
  while (selected.length) selected.pop();
});
