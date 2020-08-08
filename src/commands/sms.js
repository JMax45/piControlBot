module.exports = {
    name: 'sms',
    execute(ctx){
        const { spawn } = require("child_process");

        const args = ctx.state.command.splitArgs;
        const ls = spawn("quack", ["--tool", "sms", "--target", args[0], "--timeout", args[1], "--threads", args[2]]);
        ctx.reply(`Started sms bombing on ${args[0]}`);
        
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