module.exports.message = function (message, params, prefix) {
    let query = require('../query').query;
    query('SELECT * FROM citizens WHERE citizens_id = ' + message.author.id).then(res => {
        if (res.length > 0)
        {
            message.channel.send("You are already registered in the galactic database! :smiley:");
        }
        else
        {
            query('INSERT INTO citizens VALUES(' + message.author.id + ',1000,\"' + new Date().toString() + '\",0);').then(res => {
                message.channel.send('You have successfully been registered into the galactic database! :smiley:');
            }).catch(err => {
                message.channel.send('ERROR! Could not register you into the galactic database as an unforseen error occured... :sob:');
                console.log(err);
            });
        }
    }).catch(err => {
        message.channel.send('ERROR! Could not register you into the galactic database as an unforseen error occured... :sob:');    
    });
}

module.exports.details = {
    name: 'register',
    description: 'Registers you into the Galactic Database!',
    parameters: 'No parameters.',
    usage: '??register'
};