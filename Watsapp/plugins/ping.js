module.exports = {
  command: "ping",
  run: async ({ sock, msg }) => {
    await sock.sendMessage(msg.key.remoteJid, { text: "🏓 Pong! Bot is alive." });
  }
};
