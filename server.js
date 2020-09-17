const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  transports: ["websocket"],
});

const PORT = process.env.PORT || 4000;

const onDisconnectFactory = require("./handlers/onDisconnectFactory");
const movePieceFactory = require("./handlers/movePieceFactory");
const leaveGameFactory = require("./handlers/leaveGameFactory");
const createGameFactory = require("./handlers/createGameFactory");
const joinGameFactory = require("./handlers/joinGameFactory");

const sendGames = require("./helpers/sendGames");

app.get("/", (req, res) => res.status(200).send("hello world"));

io.on("connection", (socket) => {
  sendGames(socket);

  socket.on("disconnect", onDisconnectFactory({ io, socket }));

  socket.on("move-piece", movePieceFactory({ io, socket }));

  socket.on("leave-game", leaveGameFactory({ socket, io }));

  socket.on("create-game", createGameFactory({ io, socket }));

  socket.on("join-game", joinGameFactory({ io, socket }));
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
