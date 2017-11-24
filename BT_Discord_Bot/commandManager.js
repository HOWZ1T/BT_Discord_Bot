var commands = {
    'help': require('./commands/help'),
    'setup': require('./commands/setup'),
    'register': require('./commands/register'),
    'slots': require('./commands/slots'),
    'balance': require('./commands/balance')
};

var commandsArr = [
    require('./commands/help'),
    require('./commands/setup'),
    require('./commands/register'),
    require('./commands/slots'),
    require('./commands/balance')
];

var prefix = '=';

module.exports.on = function (event, command, message, params)
{
    switch (event)
    {
        case 'message':
            if (commands[command] == undefined) return;

            if (command === 'help') commands[command].message(message, params, prefix, commandsArr);
            else commands[command].message(message, params, prefix);
            break;
    }
}

module.exports.prefix = prefix;