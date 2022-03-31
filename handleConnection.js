const changeMap = require("./changeMap");
const moveToken = require("./moveToken");
const onJoin = require("./onJoin");
const messages = require("./messages");

const tables = [];

module.exports = (ws, game) => {
  const table = onJoin(ws, tables);
  const counter = table.players.findIndex((p) => p.ws === ws) + 1;
  ws.send(
    JSON.stringify({
      type: messages.COUNTER,
      counter,
    })
  );

  ws.on("message", (query) => {
    if (query == messages.GET_MAP) {
      ws.send(JSON.stringify({ type: messages.MAP, map: table.game }));
    } else if (JSON.parse(query).type === messages.END_MOVE) {
      const { source, index: target } = JSON.parse(query);
      moveToken(source || undefined, target || undefined, table.game);
      table.initiative === 1 ? (table.initiative = 2) : (table.initiative = 1);
      console.log(table.initiative);
      table.players.forEach(({ ws }) => {
        ws.send(JSON.stringify({ type: messages.MAP, map: table.game }));
        ws.send(
          JSON.stringify({
            type: messages.INITIATIVE,
            initiative: table.initiative,
          })
        );
      });
    } else if (JSON.parse(query).type === messages.SEND_MOVE) {
      changeMap(JSON.parse(query), table.game);
      table.players.forEach(({ ws }) => {
        ws.send(JSON.stringify({ type: messages.MAP, map: table.game }));
      });
    }
  });

  ws.on("close", function () {
    console.log(tables);
    const tableIndex = tables.findIndex(({ players }) =>
      players.some((p) => p.ws === ws)
    );
    if (tableIndex === -1) return;
    const other = table.players.filter((p) => p.ws !== ws);
    tables.splice(tableIndex, 1);

    if (other.length) {
      onJoin(other[0].ws, tables);
    }
    console.log(tables);
  });
};
