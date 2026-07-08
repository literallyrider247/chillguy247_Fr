const mineflayer = require('mineflayer');
const config = require('./config.json');

const bot = mineflayer.createBot({
  host: config.serverHost,
  port: config.serverPort,
  username: config.botUsername,
  auth: 'offline',
  version: "1.21.11",
  checkTimeoutInterval: 60 * 1000,
  hideErrors: true
});

bot.on('spawn', () => {
  // Safe position to wipe chunk data streams after the world engine loads
  if (bot.world) {
    bot.world.getColumns = () => [];
    bot.world.getColumn = () => null;
    bot.world.getColumnAt = () => null;
  }
  
  console.log(`✅ ${config.botUsername} is Ready!`);
  
  // Safe head tracking tilt
  setTimeout(() => {
    bot.look(0, -1.5);
  }, 1000);
});

bot.on('error', (err) => {
  console.error('⚠️ Error:', err.message);
});

bot.on('end', (reason) => {
  console.log('⛔️ Bot Disconnected! Reason:', reason);
});

