const handleMessage = ({ data }) => {
  const mes = JSON.parse(data);
  const { type } = mes;
  if (type === messages.COUNTER) {
    counter = mes.counter;
    document.querySelector(".whoAmI").textContent = counter;
  }
  if (type === messages.MAP) {
    const { map, initiative, gameOn, tableID: newID } = mes;
    tableId = newID;
    parseMap(map);

    document.querySelector(".turnOf").textContent = initiative;
    if (initiative === counter && phase !== 2) {
      phase = 1;
      const myPlayer = document.querySelectorAll(`.p${counter}`);
      prev = [...myPlayer].map((e) =>
        [...document.querySelectorAll(".box")].indexOf(e)
      );
      myPlayer.forEach((el) => {
        el.classList.add("opaque");
      });
    }
    if (gameOn) gameStatus.classList.add("on");
    else gameStatus.classList.remove("on");
    console.log("checkLoose", checkLoose());
    if (checkLoose()) {
      gameOver.classList.add("loss");
      gameOver.style.display = "block";
      document.querySelector(".rev").style.display = "block";
      ws.send(JSON.stringify({ type: messages.LOST }));
    }
  }
  if (type === messages.KICK) {
    root.textContent = "your opponent left!";
  } else if (type === messages.WIN) {
    gameOver.style.display = "block";
    document.querySelector(".rev").style.display = "block";
  }

  const available = getAvailable("piece");
  available.forEach((el) => {
    el.classList.add("available");
  });
  return available;
};
