const { isAdmin } = require("../utils");

class MessageEvent {
  constructor(bot) {
    this.bot = bot;
    this.meta = {
      name: "message"
    };
  }

  run(msg) {
    try {
      // Regular text check
      // TODO
      
      // Command check
      if (msg.text.substr(0, 1) !== '/') return;
      
      const args = msg.text.slice(1).trim().split(/ +/g);
      const cmdText = args.shift().toLowerCase();
      const cmd = this.bot.commands.fetch(cmdText);
      
      if (cmd.meta.adminOnly && !isAdmin(msg.from.id)) {
        return this.bot.sendMessage(msg.chat.id, 'You are not an administrator.');
      }

      switch (true) {
        case cmd.meta.channels.includes(msg.chat.type):
          cmd.run(msg, args);
          console.log(`[CMD] @${msg.from.username} executed "/${cmdText}" with arguments: ${args.join(' ') || 'n/a'}`);
          break;

        default:
          console.log(`[MSG] @${msg.from.username}: ${msg.text.substr(0, 50)}${msg.text.length > 50 ? '...' : ''}`);
          console.log(cmd);
          break;
      }
    }
    catch (e) {
      console.log(e);
    }
  }
};

module.exports = MessageEvent;
