const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const fs = require("fs");
const path = require("path");
const P = require("pino");
const config = require("./config");

const loadPlugins = () => {
  const pluginsPath = path.join(__dirname, "plugins");
  const plugins = [];

  if (!fs.existsSync(pluginsPath)) fs.mkdirSync(pluginsPath);

  fs.readdirSync(pluginsPath).forEach(file => {
    if (file.endsWith(".js")) {
      delete require.cache[require.resolve(path.join(pluginsPath, file))];
      const plugin = require(path.join(pluginsPath, file));
      plugins.push(plugin);
    }
  });

  return plugins;
};

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    logger: P({ level: "silent" }),
    auth: state,
    // QR handling moved to event (see below)
  });

  let plugins = loadPlugins();

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    // NEW QR HANDLING
    if (qr) {
      const qrcode = require("qrcode-terminal");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) startBot();
    } else if (connection === "open") {
      console.log("✅ Bot Connected");
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const sender = msg.key.participant || msg.key.remoteJid;

    if (!text.startsWith(config.prefix)) return;

    const args = text.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    for (const plugin of plugins) {
      try {
        if (plugin.command === command) {
          await plugin.run({ sock, msg, args, sender, config });
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
}

startBot();