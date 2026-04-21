module.exports = {
  command: "menu",
  run: async ({ sock, msg, config }) => {
    const menu = `╔═══『 ${config.botName} 』═══╗\n
👑 Owner Commands\n.own\n
⚙️ General\n.menu\n.ping\n.hi\n
🎮 Fun\n.joke\n.quote\n
🤖 AI\n.ai <text>\n
🖼️ Media\n.sticker (reply image)\n
╚═══════════════╝`;

    await sock.sendMessage(msg.key.remoteJid, { text: menu });
  }
};
