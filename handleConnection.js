const connections = [];

module.exports = (ws, game) => {
  const id = Date.now();
  connections.push({ id, ws });
  ws.send(
    JSON.stringify({
      type: "counter",
      counter: connections.findIndex(({ id: conId }) => id === conId) + 1,
    }),
    () => {}
  );

  ws.on("message", (query) => {
    if (query == "getMap") {
      ws.send(JSON.stringify({ type: "map", map: game.map }));
    }
  });

  ws.on("close", function () {
    const index = connections.findIndex(({ id: conId }) => conId === id);
    connections.splice(index, 1);
    connections.forEach(({ ws }, index) => {
      ws.send(
        JSON.stringify({
          type: "counter",
          counter: index + 1,
        }),
        () => {}
      );
    });
  });
};
