module.exports = {
  command: "own",
  run: async ({ sock, msg, sender, config }) => {
    if (!sender.includes(config.ownerNumber)) {
      return sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only command" });
    }

    await sock.sendMessage(msg.key.remoteJid, { text: "👑 You are the owner." });
  }
};