const { registerBotCommand } = require('../botEngine.js');

const command = {
  regex: /^!c(ode)?b(lock)?\s([a-z]+\s)?(\d+|<?https?:\/\/(www\.)?discord(app)?\.com\/channels(\/\d+){3}\/?>?)$/,
  cb: async ({ content, channel, guild }) => {
    const type = content.match(/!c(?:ode)?b(?:lock)?\s([a-z]+)/);
    const prefix = type.length === 0 ? '' : type[0];

    const linkregex = /<?https?:\/\/(?:www\.)?discord(?:app)?\.com\/channels\/(?:\d+)\/(\d+)\/(\d+)\/?>?/g;
    const groupArr = content.match(linkregex);

    if (groupArr === null) {
      const msgID = content.match(/\d+/);
      const msgToBeMarked = await channel.fetchMessage(msgID);
      return `\`\`\`${prefix}\n${msgToBeMarked}\`\`\``;
    }

    const msgID = groupArr[1];
    const channelID = groupArr[0];
    const msgToBeMarked = await guild.channel.get(channelID).fetchMessage(msgID);
    return `\`\`\`${prefix}\n${msgToBeMarked}\`\`\``;
  },
};

registerBotCommand(command.regex, command.cb);

module.exports = command;
