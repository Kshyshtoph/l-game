const generateGame = require("./generate");
const messages = require("./messages");

const onJoin = (ws, tables) => {
  const id = Date.now();
  const player = { ws, id };
  let table;
  if (tables.map(({ players }) => players).flat().length % 2 === 0) {
    table = { players: [player], game: generateGame(), initiative: 1 };
    tables.push(table);
  } else {
    table = tables[tables.length - 1];
    table.players.push(player);
  }
  const counter = table.players.length;
  new Promise((res) =>
    setTimeout(() => {
      res();
      ws.send(
        JSON.stringify({
          type: messages.COUNTER,
          counter,
        })
      );
    }, 1000)
  ).then(() =>
    table.players.forEach(({ ws }) =>
      ws.send(
        JSON.stringify({
          tableID: tables.length - 1,
          type: messages.MAP,
          map: table.game,
          initiative: table.initiative,
          gameOn: table.players.length === 2,
        })
      )
    )
  );
  return table;
};

module.exports = onJoin;
