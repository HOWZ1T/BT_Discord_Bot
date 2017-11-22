module.exports.message = function (message, params, prefix) {
    let query = require('../query').query;
    if (params[0] === undefined)
    {
        message.channel.send('You need to provide a bet amount!');
        return;
    }
    else if (isNaN(Number(params[0])) === true)
    {
        message.channel.send('Your bet needs to be a number!');
        return;
    }
    else if (Number(params[0]) <= 4)
    {
        message.channel.send('There is a minimum bet of 5 credits!');
        return;
    }

    let bet = Math.floor(Number(params[0]));
    let emojis = require('../emojis').emojis;
    let map = require('../emojis').slotsMap;
    query('SELECT credits FROM citizens WHERE citizen_id = ' + message.author.id).then(res => {
        if (res.length <= 0)
        {
            message.channel.send('You are not registered in the galactic database, use ??register to become a galactic citizen!');
            return;
        }

        if ((res[0].credits - bet) > 0)
        {
            let newbal = (res[0].credits - bet);
            let line1 = emojis.empty;
            let line2 = emojis.arrowleft;
            let line3 = emojis.empty;

            let nums = [];

            for (let i = 0; i < 3; i++)
            {
                nums.push(Math.floor(Math.random() * (6 - 0) + 0));
            }

            line1 += map[(nums[0] + 1) % 6] + map[(nums[1] + 3) % 6] + map[(nums[2] + 2) % 6] + emojis.empty;
            line2 += map[nums[0]] + map[nums[1]] + map[nums[2]] + emojis.arrowright;
            line3 += map[(nums[0] + 4) % 6] + map[(nums[1] + 5) % 6] + map[(nums[2] + 6) % 6] + emojis.empty;

            let won = 0;
            if (nums[0] === nums[1] === nums[2])
            {
                won = 1000;
                newbal += 1000;
            }
            else if (nums[0] === nums[1] || nums[1] === nums[2])
            {
                won = 500;
                newbal += 500;
            }
            else
            {
                newbal += 0;
            }

            let Discord = require('discord.js');
            let embed = new Discord.RichEmbed();
            embed.setAuthor('SLOTS', 'https://lh3.ggpht.com/jk2ny5vblYofegXxfexrJqkxU8Pfayl14thaoLYwY3AXZc63e0wsr1CD-cmZLY8_UQE=w300');
            embed.setDescription(line1 + '\n' + line2 + '\n' + line3 + '\n' + message.author.username + ' won: ' + emojis.credits + ' ' + won);
            embed.setColor(0xFFB300);
            message.channel.sendEmbed(embed);
            query('UPDATE citizens SET credits = ' + newbal + ' WHERE citizen_id = ' + message.author.id).then(res => { }).catch(err => { console.log(err) });
        }
        else
        {
            message.channel.send('Could not play slots as your bet would make you bankrupt! \nYour current balance: ' + emojis.credits + res[0].credits);
        }
    }).catch(err => {
        message.channel.send('ERROR! Could not play slots as an unforseen error occured... :sob:');
        console.log(err);
    });
}

module.exports.details = {
    name: 'slots',
    description: 'Test your luck in a round of slots!',
    parameters: '<bet> The amount of galactic credits you are willing to bet.',
    usage: '??slots <bet>'
};