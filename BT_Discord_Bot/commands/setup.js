module.exports.message = function(message, params, prefix)
{
    let query = require('../query').query;
    query('SELECT guild_id FROM guilds WHERE guild_id = ' + message.guild.id).then(res => {
        if (res.length > 0)
        {
            message.channel.send('Your guild is already setup! :smiley:');
        }
        else
        {
            let canUse = false;
            message.guild.roles.forEach(role => {
                if (role.hasPermission("ADMINISTRATOR") == true) {
                    role.members.forEach(member => {
                        if (member.id == message.author.id)
                        {
                            canUse = true;
                        }
                    });
                }
            });

            if (canUse === false)
            {
                message.channel.send('INVALID PERMISSIONS! You need ADMINISTRATOR permissions to use this role!');
                return;
            }

            if (params.length <= 0)
            {
                message.channel.send('ERROR! Could not complete setup as no member_log_channel name was provided!\nUsage: ' + prefix + 'setup <channel name>');
                return;
            }
            else if (params.length > 1)
            {
                message.channel.send('ERROR! Could not complete setup as too many parameters were provided!\nUsage: ' + prefix + 'setup <channel name>');
                return;
            }

            let channel = message.guild.channels.find('name', params[0]);

            if (!channel)
            {
                message.channel.send('ERROR! Could not complete setup as channel: ' + params[0] + ' could not be found!\nNote: Channel names are case sensitive!\n Usage: ' + prefix + 'setup <channel name>');
                return;
            }

            query('INSERT INTO guilds VALUES(' + message.guild.id + ',' + channel.id + ');').then(res => {
                if (res != undefined)
                {
                    message.channel.send('Your guild has successfully been setup! :smiley:');
                }
                else {

                    message.channel.send('ERROR! Could not complete setup as an unforseen error occured... :sob:');
                }
            }).catch(err => {
                if (err)
                {
                    message.channel.send('ERROR! Could not complete setup as an unforseen error occured... :sob:');
                }
            });
        }
    }).catch(err => {
        message.channel.send('ERROR! Could not complete setup as an unforseen error occured... :sob:');
    });
}

module.exports.details = {
    name: 'setup',
    description: 'Setups your discord server (guild) to fully utilise the features of the BT bot!',
    parameters: '<channel name> | this is the name of the channel you wish to use to log members joining and leaving the guild.',
    usage: '??setup <channel name>'
};