module.exports.Guild = class Guild
{
    constructor(guild_id, member_log_channel, restricted_channel)
    {
        this.guild_id = guild_id;
        this.member_log_channel = member_log_channel;
        this.restricted_channel = restricted_channel;
    }
}