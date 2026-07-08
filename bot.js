const mineflayer = require('mineflayer');
const config = require('./config.json');

const bot = mineflayer.createBot({
  host: config.serverHost,
  port: config.serverPort,
  username: config.botUsername,
  auth: 'offline',
  version: "1.21.11",
  checkTimeoutInterval: 90 * 1000,
  hideErrors: true,
  // Throttles connection handshake packets to bypass host filters
  waitBeforeConnect: 1500
});

bot.on('spawn', () => {
  if (bot.world) {
    bot.world.getColumns = () => [];
    bot.world.getColumn = () => null;
    bot.world.getColumnAt = () => null;
  }
  
  console.log(`✅ ${config.botUsername} is Ready!`);
  
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


