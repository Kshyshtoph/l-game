const changeMap = require("./changeMap");
const moveToken = require("./moveToken");
const onJoin = require("./onJoin");
const messages = require("./messages");
const kick = require("./kick");

const tables = [];

module.exports = {
  handleConnection: (ws) => {
    const table = onJoin(ws, tables);
    const tableID = tables.indexOf(table);
    const counter = table.players.findIndex((p) => p.ws === ws) + 1;
    ws.send(
      JSON.stringify({
        type: messages.COUNTER,
        counter,
      })
    );

    ws.on("message", (query) => {
      if (JSON.parse(query).type === messages.END_MOVE) {
        const { source, index: target } = JSON.parse(query);
        moveToken(source || undefined, target || undefined, table.game);
        table.initiative === 1
          ? (table.initiative = 2)
          : (table.initiative = 1);
        table.players.forEach(({ ws }) => {
          ws.send(
            JSON.stringify({
              tableID,
              type: messages.MAP,
              map: table.game,
              initiative: table.initiative,
              gameOn: table.players.length === 2,
            })
          );
        });
      } else if (JSON.parse(query).type === messages.SEND_MOVE) {
        changeMap(JSON.parse(query), table.game);
        table.players.forEach(({ ws }) => {
          ws.send(
            JSON.stringify({
              tableID,
              type: messages.MAP,
              map: table.game,
              initiative: table.initiative,
              gameOn: table.players.length === 2,
            })
          );
        });
      } else if (JSON.parse(query).type === messages.LOST) {
        table.players
          .find((e) => e.ws !== ws)
          .ws.send(JSON.stringify({ type: messages.WIN }));
      }
    });

    ws.on("close", function () {
      const tableIndex = tables.findIndex(({ players }) =>
        players.some((p) => p.ws === ws)
      );
      if (tableIndex === -1) return;
      const other =
        table.players.length > 1
          ? tables[tableIndex].players.filter((p) => p.ws !== ws)[0]
          : null;
      tables.splice(tableIndex, 1);
      if (!other) return;
      kick(other.ws).then(() => onJoin(other.ws, tables));
    });
  },
  tables,
};
