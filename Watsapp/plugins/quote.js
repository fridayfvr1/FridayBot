module.exports = {
  command: "quote",
  run: async ({ sock, msg }) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "💡 Stay consistent. Success follows discipline."
    });
  }
};