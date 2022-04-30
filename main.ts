import Discord, { Intents } from 'discord.js'
import { exec } from 'child_process'
import dotenv from 'dotenv'
dotenv.config()

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})
const programmingLanguages = ['C', 'C++', 'Javascript', 'Typescript', 'Java', 'Python', 'Lua', 'PHP']

client.on('ready', () => {
    console.log('bot is ready')

    // guild - recommended for development
    const guildID = process.env.GUILD_ID ?? ''
    const guild = client.guilds.cache.get(guildID)
    const commands = guild ? guild.commands : client.application?.commands

    commands?.create({
        name: 'ping',
        description: 'Replies with pong.',
    })

    commands?.create({
        name: 'add',
        description: 'Adds two numbers.',
        options: [
            {
                name: 'num1',
                description: 'First Number',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'num2',
                description: 'Second Number',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
            },
        ]
    })

    commands?.create({
        name: 'languages',
        description: 'List Known Programming Languages.',
    })

    // global - recommended for publishing
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (commandName === 'ping') {
        interaction.reply({
            content: 'pong',
            ephemeral: true
        })
    }

    if (commandName === 'add') {
        const num1 = options.getNumber('num1') ?? 0
        const num2 = options.getNumber('num2') ?? 0

        await interaction.deferReply({
            ephemeral: false
        })

        await new Promise(resolve => setTimeout(resolve, 5000))

        interaction.editReply({
            content: `The sum of ${num1} and ${num2} is ${num1 + num2}`,
            // ephemeral: true
        })
    }

    if (commandName === 'languages') {
        interaction.reply({
            content: `Here are your list of languages: ${programmingLanguages.join(', ')}`
        })
    }
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

    if (message.content.toLowerCase().includes('programming language')) {
        message.reply({
            content: programmingLanguages[Math.floor(Math.random() * programmingLanguages.length)]
        })
    }
})

client.login(process.env.TOKEN)
