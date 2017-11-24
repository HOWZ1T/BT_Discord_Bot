module.exports.message = function (message, params, prefix, commands) {
    let Discord = require('discord.js');
    let embed = new Discord.RichEmbed();
    embed.setAuthor('Help', 'https://rommanasoftware.com/images/help.png');
    embed.setColor(0xfec057);
    
    if (params[0] != undefined)
    {
        let found = false;
        commands.forEach(command => {
            let data = command.details;
            if (data.name === params[0])
            {
                embed.setTitle(data.name);
                embed.setDescription(data.description + '\n\nParameters: ' + data.parameters + '\n\nUsage: ' + prefix + data.usage);
                if (message.author.dmChannel === null)
                    message.channel.send('The help listing has been sent to you in a dm.');
                else if (message.author.dmChannel.id != message.channel.id)
                    message.channel.send('The help listing has been sent to you in a dm.');

                message.author.sendEmbed(embed);
                found = true;
            }
        });

        if (found == false)
        {
            message.channel.send("Could not get help for the command " + params[0] + " as this command may not exist. \nUse ??help to list all commands.");
        }
    }
    else
    {
        commands.forEach(command => {
            let data = command.details;
            embed.addField(data.name, prefix + data.usage, false);
        });

        if (message.author.dmChannel === null)
            message.channel.send('The help listing has been sent to you in a dm.');
        else if (message.author.dmChannel.id != message.channel.id)
            message.channel.send('The help listing has been sent to you in a dm.');

        message.author.sendEmbed(embed);
    }
}

module.exports.details = {
    name: 'help',
    description: 'Lists all available commands.',
    parameters: '<[OPTIONAL] command name> | Lists detailed information about the specific command.',
    usage: 'help <[OPTIONAL] command name>'
};