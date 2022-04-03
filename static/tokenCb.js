const cbMoveToken = (e, index) => {
  if (phase !== 2) return;
  const token = e.removeChild(e.children[0]);
  const source = boxes.indexOf(e);
  boxes[index].appendChild(token);
  listeners.forEach((l) => l.clear());
  while (listeners.length) listeners.pop();
  boxes.forEach((box) => box.classList.remove("available"));
  getAvailable("piece").forEach((box) => {
    box.classList.add("available");
  });
  ws.send(JSON.stringify({ type: messages.END_MOVE, source, index }));
  phase = 3;
};
const cbSelectToken = (e) => {
  if (phase !== 2) return;
  selected = [{ node: e }];
  e.classList.add("selected");
  const boxes = [...document.querySelectorAll(".box")];
  const available = getAvailable("token");
  available.forEach((spot) => {
    const index = boxes.indexOf(spot);
    spot.addEventListener("click", () => cbMoveToken(e, index));
    const clear = () => {
      spot.removeEventListener("click", () => cbMoveToken(e, index));
    };
    listeners.push({ clear });
  });
};
