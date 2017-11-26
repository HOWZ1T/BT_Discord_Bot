﻿module.exports.message = function (message, params, prefix) {
    let Discord = require('discord.js');
    let query = require('../query').query;

    query('SELECT packs FROM citizens WHERE citizen_id = ' + message.author.id).then(res => {
        if (res.length <= 0)
        {
            message.channel.send('You are not registered in the galactic database, use ***??register*** to become a galactic citizen!');
            return;
        }

        if ((res[0].packs - 1) >= 0)
        {
            query("UPDATE citizens SET packs = " + (res[0].packs - 1) + " WHERE citizen_id = " + message.author.id);
        }
        else
        {
            message.channel.send('You have no packs to open. Use ' + prefix + 'buypacks to buy packs');
            return;
        }

        let numPacks = res[0].packs - 1;
        let rand = Math.random();
        let rarity = 0;
        let quantity = Math.floor(Math.random() * (3 - 1) + 1);
        let credits = 0;

        //53% for common, 30% for uncommon, 12% for rare, 5% legendary
        if (rand >= 0 && rand <= 0.05)
        {
            rarity = 1;
        }
        else if (rand > 0.05 && rand <= 0.17)
        {
            rarity = 2;
        }
        else if (rand > 0.17 && rand <= 0.47)
        {
            rarity = 3;
        }
        else if (rand > 0.47 && rand <= 1)
        {
            rarity = 4;
        }

        rand = Math.random();
        //25% chance to get 300 credits
        if (rand >= 0 && rand <= 0.25)
        {
            credits = 300;
        }

        if (credits > 0)
        {
            query("UPDATE citizens SET credits = " + (res[0].credits + credits) + " WHERE citizen_id = " + message.author.id + ";");
        }

        query("SELECT * FROM items WHERE rarity = " + rarity + " ORDER BY RAND() LIMIT " + quantity + ";").then(res => {
            let emojis = "";
            for (let i = 0; i < res.length; i++)
            {
                emojis += res[i].code;
                query("SELECT * FROM inventory WHERE citizen_id = " + message.author.id + " AND item_id = " + res[i].item_id + ";").then(resB => {
                    if (resB.length <= 0)
                    {
                        query("INSERT INTO inventory VALUES (" + message.author.id + "," + res[i].item_id + ",1);");
                    }
                    else
                    {
                        query("UPDATE inventory SET quantity = " + (resB[0].quantity + 1) + " WHERE citizen_id = " + message.author.id + " AND item_id = " + res[i].item_id + ";");
                    }
                });
            }

            let embed = new Discord.RichEmbed();
            embed.setAuthor('Pack', 'http://canacopegdl.com/images/pack/pack-0.jpg');
            embed.addField("Items: ", emojis, false);

            let creditsEmoji = require('../emojis').emojis.credits;
            let thumbs = require('../lootThumbs').thumbsArr;
            if (credits > 0)
            {
                embed.addField("Bonus: ", creditsEmoji + credits, false);
            }
            embed.setColor(0xFFB300);
            embed.setThumbnail(thumbs[rarity - 1]);
            embed.setFooter('You have ' + numPacks + ' packs left');
            message.channel.sendEmbed(embed);
        });
    });
}

module.exports.details = {
    name: 'openpacks',
    description: 'Opens a item pack',
    parameters: 'No parameters',
    usage: 'openpacks'
};