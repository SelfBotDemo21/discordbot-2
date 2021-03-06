/**
 * Created by julia on 02.10.2016.
 */
var async = require('async');
var cmd = 'broadcast';
var logger = require('../utility/logger');
var winston = logger.getT();
var config = require('../config/main.json');
var execute = function (message) {
    if (message.author.id === config.owner_id) {
        let content = message.content.substr(message.prefix.length + cmd.length).trim();
        let guilds = message.botUser.guilds.array();
        async.eachSeries(guilds, (guild, cb) => {
            if (guild.id !== '110373943822540800') {
                guild.defaultChannel.sendMessage(content).then(message => {
                    cb();
                }).catch(err => {
                    winston.info(err);
                    cb();
                });
            } else {
                async.setImmediate(() => {
                    cb();
                });
            }
        }, (err) => {
            if (err) return winston.info(err);
            message.channel.sendMessage(`Sent broadcast to ${guilds.length - 1} Guilds`);
        });
    }
};
module.exports = {cmd: cmd, accessLevel: 0, exec: execute, cat: 'admin'};