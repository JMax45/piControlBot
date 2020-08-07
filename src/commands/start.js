module.exports = {
    name: 'start',
    execute(ctx, params){
        const { basicAnswers } = params;
        const index = basicAnswers.map(e => e.keyword).indexOf('start');
        ctx.replyWithMarkdown(basicAnswers[index].text);
    }
}