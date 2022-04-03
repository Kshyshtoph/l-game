const messages = require("./messages");

module.exports = kick = (ws) => {
  ws.send(JSON.stringify({ type: messages.KICK }));
  return new Promise((res) => setTimeout(res(), 20000));
};
