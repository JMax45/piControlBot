module.exports = {
    name: 'sms',
    execute(ctx, params){
        const { spawn, exec } = require("child_process");
        const { jmongo } = params;

        const args = ctx.state.command.splitArgs;

        jmongo.load('bannedNumbers', { number: args[0] }, (result) => {
            if(result===null){
                const ls = spawn("quack", ["--tool", "sms", "--target", args[0], "--timeout", args[1], "--threads", args[2]]);
                ctx.reply(`Started sms bombing on ${args[0]}`);
                executeBombing(ls);
            }
            else{
                ctx.replyWithMarkdown(`\`${args[0]}\` is a protected number, it belongs to *${result.name}*`)
            }
        })

        function executeBombing(ls){
            let amount = 0;
            ls.stdout.on("data", data => {
                const split = String(data).split(/\r?\n/);
                for(let i=0; i<split.length; i++){
                    if(split[i].indexOf('[+]')!=-1){
                        amount++;
                    }
                }
            });

            ls.stderr.on("data", data => {
                ctx.reply('There was an error: ' + data);
            });

            ls.on('error', (error) => {
                ctx.reply('There was an error: ' + error.message);
            });

            ls.on("close", code => {
                ctx.reply(`Bombing completed, ${amount} messages sent`);
            });
        }    
    }
}