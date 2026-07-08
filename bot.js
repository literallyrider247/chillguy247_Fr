const mineflayer = require('mineflayer');
const config = require('./config.json');

const bot = mineflayer.createBot({
  host: config.serverHost,
  port: config.serverPort,
  username: config.botUsername,
  auth: 'offline',
  version: "1.21.11",
  checkTimeoutInterval: 60 * 1000, // Extends timeout windows
  hideErrors: true
});

// Completely disables physics and world tracking to prevent addChunk packet crashes
bot.on('inject_allowed', () => {
  bot.world.getColumns = () => []
  bot.world.getColumn = () => null
  bot.world.getColumnAt = () => null
})

bot.on('spawn', () => {
  console.log(`✅ ${config.botUsername} is Ready!`);
  
  // Enforces look down safety to avoid anti-cheat flag drops
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
