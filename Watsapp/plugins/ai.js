const axios = require("axios");

module.exports = {
  command: "ai",
  run: async ({ sock, msg, args }) => {
    const query = args.join(" ");
    if (!query) return sock.sendMessage(msg.key.remoteJid, { text: "Ask something." });

    // Replace with real API later
    await sock.sendMessage(msg.key.remoteJid, {
      text: `🤖 AI says: ${query}... (connect API later)`
    });
  }
};