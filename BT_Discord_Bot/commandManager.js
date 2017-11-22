var commands = {
    'setup': require('./commands/setup')
};

var prefix = '??';

module.exports.on = function (event, command, message, params)
{
    switch (event)
    {
        case 'message':
            if (commands[command] == undefined) return;
            commands[command].message(message, params, prefix);
            break;
    }
}

module.exports.prefix = prefix;