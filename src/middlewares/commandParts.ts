// took from https://github.com/telegraf/telegraf-command-parts

const regex = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]+)?$/i;

const commandParts = (ctx: any, next: any) => {
  const messageText =
    ctx.updateType === 'channel_post' ? ctx.channelPost.text : ctx.message.text;
  const parts = regex.exec(messageText);
  if (!parts) return next();
  const command = {
    text: messageText,
    command: parts[1],
    bot: parts[2],
    args: parts[3],
    get splitArgs() {
      return !parts[3] ? [] : parts[3].split(/\s+/).filter((arg) => arg.length);
    },
  };
  ctx.state.command = command;
  return next();
};

export default commandParts;
