module.exports.message = function (message, params, prefix) {
    let Discord = require('discord.js');
    let query = require('../query').query;

    let embed = new Discord.RichEmbed();
    embed.setAuthor('Inventory', 'https://i.ebayimg.com/images/g/nsQAAOSwQ59ZYEGY/s-l225.jpg');
    embed.setColor(0xFFB300);

    query("SELECT items.code, items.name, items.rarity, inventory.quantity FROM inventory JOIN items ON inventory.item_id = items.item_id WHERE inventory.citizen_id = " + message.author.id + " ORDER BY items.rarity ASC;").then(res => {
        if (res.length <= 0)
        {
            message.channel.send('<@' + message.author.id + '> Your inventory is empty :sad:');
            return;
        }

        for (let i = 0; i < res.length; i++)
        {
            if (i % 20 === 0 && i != 0) {
                message.author.sendEmbed(embed);
                embed = new Discord.RichEmbed();
                embed.setAuthor('Inventory', 'https://i.ebayimg.com/images/g/nsQAAOSwQ59ZYEGY/s-l225.jpg');
                embed.setColor(0xFFB300);
            }

            let rarity = '';
            switch (res[i].rarity)
            {
                case 4:
                    rarity = 'Common';
                    break;

                case 3:
                    rarity = 'Uncommon';
                    break;

                case 2:
                    rarity = 'Rare';
                    break;

                case 1:
                    rarity = 'Legendary';
                    break;
            }
            embed.addField(res[i].code + ' x ' + res[i].quantity, res[i].name + '\n' + rarity, true);
        }

        if (message.author.dmChannel === null)
            message.channel.send('Your inventory has been sent to you in a dm.');
        else if (message.author.dmChannel.id != message.channel.id)
            message.channel.send('Your inventory has been sent to you in a dm.');

        message.author.sendEmbed(embed);
    });
}

module.exports.details = {
    name: 'inventory',
    description: 'Lists items in your inventory',
    parameters: 'No parameters.',
    usage: 'inventory'
};