module.exports.message = function (message, params, prefix) {
    let query = require('../query').query;
    query('SELECT credits FROM citizens WHERE citizen_id = ' + message.author.id).then(res => {
        if (res.length <= 0)
        {
            message.channel.send('You are not registered in the galactic database, use ??register to become a galactic citizen!');
            return;
        }

        let emojis = require('../emojis').emojis;
        message.channel.send(emojis.credits + ' ' + res[0].credits);
    }).catch(err => {
        message.channel.send('ERROR! Could not get your balance as an unforseen error occured... :sob:');
    });
}

module.exports.details = {
    name: 'balance',
    description: 'Gets your galactic credits.',
    parameters: 'No parameters.',
    usage: '??balance'
};