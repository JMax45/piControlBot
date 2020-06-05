![Node.js CI](https://github.com/JMax45/piControlBot/workflows/Node.js%20CI/badge.svg)

# piControlBot

piControlBot is a bot that helps you check the status of your raspberry pi through [Telegram](https://telegram.org/).

This allows you to stay in touch with your raspberry even from your phone.

The bot contains a list of commands that will be expanded, for example you can get the IP of your raspberry, check the CPU temperature or perform an sms bombing.

You can check all commands [here](https://github.com/JMax45/piControlBot/blob/master/docs/commands.md).

~~In addition, every hour the bot sends a summary of the raspberry status to the admin.~~

All tests are performed on [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), for now I cannot guarantee stable performance on other linux distributions.

## Installation

Use git to clone piControlBot:

```bash
git clone https://github.com/JMax45/piControlBot
```
Go to the directory:
```bash
cd piControlBot
```
Use [Node Package Manager](https://www.npmjs.com/) to install the dependencies:
```bash
npm install
```
## Configuration
Put your bot token in __data/bot.json__:
```bash
{"token":"yourToken"}
```
You can get one from [@BotFather](https://telegram.me/BotFather).

Launch the bot:
```bash
node index.js
```

If it is the first time that the bot is launched, you will have to write him /start on Telegram to register your id.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
