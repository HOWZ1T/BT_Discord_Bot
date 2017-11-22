const query = require('./query').query;
const commandManager = require('./commandManager');
const Discord = require('discord.js');
const bot = new Discord.Client();

const commandPrefix = commandManager.prefix;

bot.on('disconnect', event => {
    console.log("BT disconnected!");
});

bot.on('warn', info => {
    console.log('Warning!\n' + info);
});

bot.on('error', error => {
    console.log("BT Encountered an ERROR:\n" + error);
});

bot.on('reconnecting', replayed => {
    console.log("BT Reconnected! " + replayed + " Events Replayed!");
});

bot.on('guildCreate', guild => {
    console.log('BT has joined the guild: ' + guild.name);
});

bot.on('guildDelete', guild => {
    console.log('BT has left the guild: ' + guild.name);
});

bot.on('guildMemberAdd', member => {
    try
    {
        console.log(member.displayName + ' has joined the guild: ' + member.guild.name);

        let rows = query('SELECT member_log_channel FROM guilds WHERE guild_id = ' + member.guild.id + ';');
        rows.then(res => {
            if (res.length <= 0) return;

            //try to find member-log channel
            let channel = member.guild.channels.find('id', res[0].member_log_channel);

            if (!channel) return;

            let date = new Date();
            let embed = new Discord.RichEmbed();
            let profilePic = member.user.avatarURL || bot.user.defaultAvatarURL;
            embed.setAuthor(member.user.username, profilePic);
            embed.setTitle('Welcome ' + member.user.username + ' to the guild!');
            embed.setDescription('Joined: ' + date.toUTCString());
            embed.setColor(0xFFB300);
            embed.setThumbnail(profilePic);
            channel.sendEmbed(embed);
        });
    }
    catch (err)
    {
        console.log(err);
    }
});

bot.on('guildMemberRemove', member => {
    try
    {
        console.log(member.displayName + ' has left the guild: ' + member.guild.name);

        let rows = query('SELECT member_log_channel FROM guilds WHERE guild_id = ' + member.guild.id + ';');
        rows.then(res => {
            if (res.length <= 0) return;

            //try to find member-log channel
            let channel = member.guild.channels.find('id', res[0].member_log_channel);

            if (!channel) return;

            let date = new Date();
            let embed = new Discord.RichEmbed();
            let profilePic = member.user.avatarURL || bot.user.defaultAvatarURL;
            embed.setAuthor(member.user.username, profilePic);
            embed.setTitle(member.user.username + ' has left the guild! :sob:');
            embed.setDescription('Left: ' + date.toUTCString());
            embed.setColor(0xFF0000);
            embed.setThumbnail(profilePic);
            channel.sendEmbed(embed);
        });
    }
    catch (err)
    {
        console.log(err);
    }
});

bot.on('message', message => {
    try
    {
        if (message.author.id != bot.user.id) //not looking at messages from itself, avoids bot -> bot loops
        {
            //Check if message is a command
            if (message.content.substr(0, 2) == commandPrefix)
            {
                //check for parameters
                let data = message.content.split(' ');
                let command = data[0].replace(commandPrefix, '');
                let params = [];
                if (data.length > 1)
                {
                    for (let i = 1; i < data.length; i++)
                    {
                        params.push(data[i]);
                    }
                }

                commandManager.on('message', command, message, params);
            }
        }
    }
    catch (err)
    {
        console.log(err);
    }
});

bot.on('ready', function () {
    console.log("BT Online and ready!\nConnected guilds: " + bot.guilds.size);
    bot.user.setPresence({ status: 'online', game: { name: 'Use ??help' } });
});

bot.login(process.argv[0]);