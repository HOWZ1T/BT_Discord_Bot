module.exports.message = function (message, params, prefix) {
    let Discord = require('discord.js');
    let query = require('../query').query;

    query('SELECT packs FROM citizens WHERE citizen_id = ' + message.author.id).then(res => {
        if (res.length <= 0)
        {
            message.channel.send('You are not registered in the galactic database, use ***??register*** to become a galactic citizen!');
            return;
        }

        message.channel.send('You have ' + res[0].packs + ' packs. Use '+prefix+'openpack to open your packs.');
    });
}

module.exports.details = {
    name: 'packs',
    description: 'Gets the number of your unopened packs',
    parameters: 'No parameters',
    usage: 'packs'
};