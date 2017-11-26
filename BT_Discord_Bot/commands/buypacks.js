module.exports.message = function (message, params, prefix) {
    let Discord = require('discord.js');
    let query = require('../query').query;

    if (params.length > 1)
    {
        message.channel.send('Too many parameters!');
        return;
    }

    if (params.length < 1)
    {
        message.channel.send('Missing parameter: <number of packs> \nUse ' + prefix + 'help buypack for more information.');
        return;
    }

    if (isNaN(params[0]) === true)
    {
        message.channel.send('Invalid parameter! ' + params[0] + ' is not a valid number!');
        return;
    }

    if ((params[0] % 1) != 0)
    {
        message.channel.send('Invalid parameter! ' + params[0] + ' is not a whole number, NO decimals!');
        return;
    }

    let numPacks = Math.floor(Number(params[0]));
    let price = 1000 * numPacks;
    query('SELECT credits, packs FROM citizens WHERE citizen_id = ' + message.author.id).then(res => {
        if (res.length <= 0)
        {
            message.channel.send('You are not registered in the galactic database, use ***??register*** to become a galactic citizen!');
            return;
        }

        let emojis = require('../emojis').emojis;
        if ((res[0].credits - price) < 0)
        {
            message.channel.send('Could not buy ' + params[0] + ' packs, as you would go bankrupt!\nPrice Per Pack: ' + emojis.credits + '1000\nYour balance: ' + emojis.credits + res[0].credits);
            return;
        }

        query('UPDATE citizens SET credits = ' + (res[0].credits - price) + ', packs = ' + (numPacks + res[0].packs) + ' WHERE citizen_id = ' + message.author.id + ';');
        message.channel.send(numPacks + ' packs have been added to your account. Use **'+prefix+'openpack** to open your packs.');
    });
}

module.exports.details = {
    name: 'buypacks',
    description: 'Use galactic credits to purchase item packs',
    parameters: '<number of packs>',
    usage: 'buypacks <number of packs>'
};