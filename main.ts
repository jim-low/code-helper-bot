import Discord, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})
const programmingLanguages = ['C', 'C++', 'Javascript', 'Typescript', 'Java', 'Python', 'Lua', 'PHP']
const roastLines = [
    'B stands for stoobid',
    'STOOBID',
    'Failure',
    'i used to walk 20 miles, uphill, both ways, 20 hours a day, with one foot, my other foot starting a bizznes',
    'you\'re 9 years old, not a child anymore, go get a job',
]
const failureLines = [
    'you FAILURE',
    'how many times can you be a FAILURE',
    'F A I L U R E',
    'my cat can do better than you lah',
    'i\'d rather watch bok choi grow',
    'you want to be failure, go be failure',
]

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

    commands?.create({
        name: 'roast',
        options: [
            {
                name: 'user',
                description: 'User to be called failure',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.USER
            },
        ],
        description: 'Random Roast Line from Steven He',
    })

    commands?.create({
        name: 'failure',
        options: [
            {
                name: 'user',
                description: 'User to be called failure',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.USER
            },
        ],
        description: 'Call a user a failure',
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

    if (commandName === 'roast') {
        const user = options.getUser('user')

        interaction.reply({
            content: `${user?.toString()} ${roastLines[Math.floor(Math.random() * roastLines.length)]}`,
            ephemeral: false
        })
    }

    if (commandName === 'failure') {
        const user = options.getUser('user')

        interaction.reply({
            content: user?.username === 'Jim Low' ? `${user?.toString()} I'm proud of you :)` : `${user?.toString()} ${failureLines[Math.floor(Math.random() * failureLines.length)]}`,
            ephemeral: false
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
