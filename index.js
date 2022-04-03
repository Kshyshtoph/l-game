const express = require("express");
const app = express();
const generateGame = require("./generate");
const messages = require("./messages");
var WebSocketServer = require("ws").Server;
var http = require("http");
var port = process.env.PORT || 3000;

const { handleConnection, tables } = require("./handleTables");

app.use(express.static(__dirname + "/static"));

var server = http.createServer(app);
server.listen(port);

"http server listening on %d", port;

var wss = new WebSocketServer({ server: server });

wss.on("connection", (ws) => {
  handleConnection(ws);
});

app.get("/reset/:tableID", (req, res) => {
  const { tableID } = req.params;
  const table = tables[parseInt(tableID)];
  table.game = generateGame();
  table.players.forEach(({ ws }) =>
    ws.send(
      JSON.stringify({
        tableID,
        type: messages.MAP,
        map: table.game,
        initiative: table.initiative,
        gameOn: table.players.length === 2,
      })
    )
  );
});

app.get("/tables", (_, res) => res.send(JSON.stringify(tables)));
