const handleMessage = ({ data }) => {
  const mes = JSON.parse(data);
  const { type } = mes;
  if (type === messages.COUNTER) {
    counter = mes.counter;
    root.append("you're player #" + mes.counter);
    setTimeout(() => {
      ws.send(messages.GET_MAP);
    }, 1000);
  }
  if (type === messages.MAP) parseMap(mes.map);
  if (type === messages.INITIATIVE) {
    if (mes.initiative === counter) phase = 1;
  }
  if (type === messages.KICK) {
    root.textContent = "your opponent left!";
    setTimeout(() => {
      ws.send(messages.GET_MAP);
    }, 1000);
  }

  const available = getAvailable("piece");
  available.forEach((el) => {
    el.classList.add("available");
  });

  const myPlayer = document.querySelectorAll(`.p${counter}`);
  myPlayer.forEach((el) => {
    el.classList.add("opaque");
  });
  return available;
};
