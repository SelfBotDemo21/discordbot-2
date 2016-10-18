/**
 * Created by julia on 02.10.2016.
 */
var i18nBean = require('../utility/i18nManager');
var t = i18nBean.getT();
var cmd = 'report';
var config = require('../config/main.json');
var execute = function (message) {
    message.botUser.fetchUser(config.owner_id).then(owner => {
        if (message.guild) {
            let content = message.content.substr(message.prefix.length + cmd.length).trim();
            owner.sendMessage(`Bugreport received! From: ${message.guild.name} (${message.guild.id}), By:${message.author.username} (${message.author.id}) Content:\`\`\` ${content}\`\`\``);
        } else {
            let content = message.content.substr(message.prefix.length + cmd.length).trim();
            owner.sendMessage(`Bugreport received! From: PM, By:${message.author.username} (${message.author.id}) Content:\`\`\` ${content}\`\`\``);
        }
        message.reply(t('report', {lngs:message.lang}));
    });
};
module.exports = {cmd:cmd, accessLevel:0, exec:execute};