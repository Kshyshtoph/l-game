const express = require("express");
const app = express();
const generateGame = require("./generate");
var WebSocketServer = require("ws").Server;
var http = require("http");
var port = process.env.PORT || 3000;
let game = generateGame();

const handleConnection = require("./handleConnection");

app.use(express.static(__dirname + "/static"));

var server = http.createServer(app);
server.listen(port);

console.log("http server listening on %d", port);

var wss = new WebSocketServer({ server: server });

wss.on("connection", (ws) => {
  handleConnection(ws, game);
});

app.get("/reset", (_, res) => {
  game = generateGame();
  res.send(game.map);
});
