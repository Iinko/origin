// Packages

var Discord = require('discord.js')
var rbxbot = require('noblox.js')
var bot = new Discord.Client();
const fs = require('fs');
var config = require('./config.json')




bot.commands = new Discord.Collection();
const commandfiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'))

for (const file of commandfiles) {
    const command = require(`./Commands/${file}`);
    bot.commands.set(command.name, command);
}


bot.on('message', (message) => {
    // Variables

    var msg = message.content.toLowerCase()
    var prefix = ':'
    var args = message.content.split(/ +/)

    if (message.author.bot) return; // message.author is a bot, and itll be ignored
    if (message.channel.type === 'dm') return; // Ignores dm's to prevent errors from bot




   
   
    if (msg.startsWith(prefix + 'userinfo')) {
        bot.commands.get('UserInfo').execute(message,msg);
    }

    if (msg.startsWith(prefix + 'setrank')) {
        
        if (message.member.roles.cache.has('754057896635138119')){
        bot.commands.get('SetRank').execute(message,msg,args,config);}
        
        else message.reply('You do not have the Ranking Permissions role to enter this command!')
    }



});









bot.on('ready', async() => {

    console.log("The bot is currently running!")
    bot.user.setActivity("the :help command", {type : "LISTENING"} )
    await rbxbot.setCookie(config.Cookie)
    .then(() => console.log('Logged Into roblox'))
    .catch((err) => console.log(err.message))
    // Runs login sequence


});


//#region Bot Token
bot.login(config.Token)
//#endregion