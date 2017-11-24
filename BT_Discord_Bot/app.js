const fs = require('fs'); //IMPORTS
const query = require('./query').query;
const commandManager = require('./commandManager');
const Discord = require('discord.js');
const bot = new Discord.Client();

const commandPrefix = commandManager.prefix; //VARIABLES
const cps = [4, 60]; //Commands Per Second (cps). cps[0] = number of commands, cps[1] = seconds
const activeUsers = []; //Array for rate limiting users. Each element a JSON object: {userid, numCommands (number of commands in last cps[1] seconds), time, warned (boolean)}

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
    console.log("BT Reconnected! " + (replayed || 0) + " Events Replayed!");
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
            if (message.content.startsWith(commandPrefix))
            {
                //Check if rate limit has been exceeded
                let registered = false;
                let limit = false;
                for (let j = 0; j < activeUsers.length; j++)
                {
                    let user = activeUsers[j];
                    if (user.userid === message.author.id)
                    {
                        registered = true;
                        if (user.numCommands >= cps[0])
                        {
                            if (user.warned === false)
                            {
                                user.warned = true;
                                limit = true;
                                message.channel.send('<@' + message.author.id + '> you are on cooldown please wait ' + user.time + ' seconds.');
                                break;
                            }
                        }
                        else
                        {
                            user.numCommands++;
                            //check for parameters
                            let data = message.content.split(' ');
                            let command = data[0].replace(commandPrefix, '');
                            let params = [];
                            if (data.length > 1) {
                                for (let i = 1; i < data.length; i++) {
                                    params.push(data[i]);
                                }
                            }

                            commandManager.on('message', command, message, params);
                            break;
                        }
                    }
                }

                if (registered == false)
                {
                    activeUsers.push({
                        userid: message.author.id,
                        numCommands: 0,
                        time: cps[1],
                        warned: false
                    });
                }
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
    bot.user.setPresence({ status: 'online', game: { name: 'Use ' + commandPrefix + 'help' } });
    
    if (process.argv[7] != undefined)
    {
        if (process.argv[7] === 'true')
        {
            let pack = fs.readFileSync('package.json');
            let version = JSON.parse(pack).version;

            bot.guilds.forEach(guild => {
                query("SELECT announcement_channel FROM guilds WHERE guild_id = " + guild.id).then(res => {
                    if (res.length == 1)
                    {
                        let channel = guild.channels.find("id", res[0].announcement_channel);

                        if (!channel) return;

                        let embed = new Discord.RichEmbed();
                        embed.setAuthor('BT', bot.user.avatarURL);
                        embed.setTitle('PATCH: ' + version);
                        embed.setDescription('The bot has been updated to version: ' + version);
                        embed.setColor(0x00FF00);
                        embed.setThumbnail(bot.user.avatarURL);
                        channel.sendEmbed(embed);
                    }
                }).catch(err => { console.log(err) });
            });
        }
    }
});

bot.login(process.argv[2]);

setInterval(function () {
    for (let i = 0; i < activeUsers.length; i++)
    {
        //update data
        activeUsers[i].time--;
        if (activeUsers[i].time <= 0)
        {
            //check if we can clear this user from memory, i.e: the user is no longer active
            if (activeUsers[i].numCommands <= 0)
            {
                activeUsers.splice(i, 1);
                continue;
            }
            else
            {
                //update the active user variables
                activeUsers[i].time = cps[1];
                activeUsers[i].numCommands = 0;
                activeUsers[i].warned = false;
                continue;
            }
        }
    }
}, 1000);