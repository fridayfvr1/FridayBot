module.exports = {
  command: "sticker",
  run: async ({ sock, msg }) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "⚠️ Sticker feature needs media handling upgrade (I can add it next)"
    });
  }
};