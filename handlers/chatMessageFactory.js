const sendGames = require("../helpers/sendGames");

module.exports = ({ io, socket }) => (message) => {
  sendGames(io);
};
