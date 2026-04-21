module.exports = {
  command: "joke",
  run: async ({ sock, msg }) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "😂 Why do JavaScript devs wear glasses? Because they don't C#"
    });
  }
};