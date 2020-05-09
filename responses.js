class Responses{
    constructor(){

    }
    getCpuTwo(ctx, si){
        si.cpuTemperature()
                .then(data => {
                    ctx.reply(`Average temperature: ${data.main}°C\nMaximum temperature: ${data.max}°C`);
                })
                .catch(error => console.error(error));
    }
    getIp(ctx, ip, publicIp){
        let externalIp;
        (async () => { 
            externalIp = await publicIp.v4();
            ctx.reply(`Local IP: ${ip.address()}\nPublic IP: ${externalIp}`);
        })();
    } 
    getRestart(ctx, Bot){
        if(Bot.adminId==ctx.from.id){
            ctx.reply("Restarting the server");
            require('child_process').exec('shutdown now -r', console.log);
        }
        else{
            ctx.reply("You must be an administrator to run this command");
        }    
    } 
    getShutdown(ctx, Bot){
        if(Bot.adminId==ctx.from.id){
            ctx.reply("Server shutdown");
            require('child_process').exec('shutdown now', console.log);
        }    
        else{
            ctx.reply("You must be an administrator to run this command");
        }
    } 
    getSpeedTest(ctx, speedTest, options){
        ctx.reply("Speedtest started...");
        (async () => {
            try {
            const result = await speedTest(options);
            // Finds speed by converting to bits and dividing for time
            const downloadSpeed = (result.download.bytes*8 / result.download.elapsed/1000).toFixed(2);
            const uploadSpeed = (result.upload.bytes*8 / result.upload.elapsed/1000).toFixed(2);
            const ping = Math.round(result.ping.latency);
            
            ctx.reply(`Download: ${downloadSpeed}\nUpload: ${uploadSpeed}\nPing: ${ping}`);
            } catch (err) {
            console.log(err.message);
            } finally {
            }
        })();
    } 
    getUpgrade(ctx){
        require('child_process').exec('apt-get upgrade', console.log);
        ctx.reply("System upgraded");
    } 
    getSmsBomb(ctx, exec){
        ctx.reply("Started sms bombing...");
        const command = `quack --tool SMS --target ${ctx.state.command.splitArgs[0]} --time ${ctx.state.command.splitArgs[1]} --threads ${ctx.state.command.splitArgs[2]}`;
        require('child_process').exec(command);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            const result = stdout.split("\n");
            var sentMessages = 0;
            for(let i=0; i<result.length; i++){
                const index = result[i].search("[+]");
                if(index!=-1){
                    sentMessages++;
                }
            }
            ctx.reply(`${sentMessages} messages sent`);
        });
    }
    getAudio(ctx, googleTTS){
        googleTTS(ctx.state.command.args, 'it', 1)   // speed normal = 1 (default), slow = 0.24
        .then(function (url) {
            /* mp3 format
            ctx.replyWithAudio({
                url: url,
                filename: "piControlBot"
            })*/
            ctx.replyWithVoice({
                url: url,
                filename: "piControlBot"
            })
        })
        .catch(function (err) {
            console.error(err.stack);
        });
    }
    getQR(ctx, fs, QRCode){
        QRCode.toDataURL(ctx.state.command.args, function (err, url) {
            ctx.replyWithPhoto( {source: Buffer.from(url.replace('data:image/png;base64,', ''), 'base64')} )
        })
    }
}
module.exports = Responses;