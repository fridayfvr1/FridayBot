module.exports = {
  command: "hi",
  run: async ({ sock, msg }) => {
    await sock.sendMessage(msg.key.remoteJid, { text: "👋 Hello there!" });
  }
};
