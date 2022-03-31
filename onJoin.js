const generateGame = require("./generate");

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
  ws.send(JSON.stringify({ type: "map", map: table.game }));
  console.log(tables);
  return table;
};

module.exports = onJoin;
