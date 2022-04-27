import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})

client.on('ready', () => {
    console.log('bot is ready!!')
})

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.reply({
            content: 'pong'
        })
    }

    if (message.content === 'say something good') {
        message.reply({
            content: 'something good'
        })
    }

    if (message.content.toLowerCase().includes('jimmus')) {
        message.reply({
            content: 'it is Jim, not jimmus'
        })
    }
})

client.login(process.env.TOKEN)
