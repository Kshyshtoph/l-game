const handleMessage = ({ data }) => {
  const mes = JSON.parse(data);
  const { type } = mes;
  console.log(type);
  if (type === "counter") {
    counter = mes.counter;
    console.log(`${type} ${counter}`);
    root.append("you're player #" + mes.counter);
    setTimeout(() => {
      ws.send("getMap");
    }, 3000);
  }
  if (type === "map") {
    console.log("map recieved!");
    parseMap(mes.map);
  }
  const boxes = document.querySelectorAll(".box");

  const available = [...boxes].filter((el) => {
    if (counter > 2) return false;
    const allPossible = ["p1", "p2"];
    const index = allPossible.findIndex((el) => el === `p${counter}`);
    allPossible.splice(index, 1);
    return !el.classList.contains(allPossible[0]) && el.children.length === 0;
  });
  available.forEach((el) => {
    el.classList.add("available");
  });

  const myPlayer = document.querySelectorAll(`.p${counter}`);
  myPlayer.forEach((el) => {
    el.classList.add("opaque");
  });
  return available;
};
