module.exports = {
    name: 'admin',
    execute(ctx, params){
        const { jmongo } = params;
        jmongo.load('config', { type: 'config' }, (result) => {
            if(result.admin==undefined){
                jmongo.changeDocument('config', { type: 'config' }, { admin: ctx.from.id });
                ctx.reply('You have been registered as an administrator.');
            }
            else{
                ctx.reply('An administrator is already registered.');
            }
        })
    }
}