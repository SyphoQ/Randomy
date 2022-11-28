require('dotenv').config();
const Discord = require('discord.js');
const { faker } = require('@faker-js/faker');

const client = new Discord.Client({
    intents: ["Guilds"]
})

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`)

    await client.application.commands.create({
        name: 'info',
        description: 'Gives you fake identity'
    })
    await client .application.commands.create({
        name: "username",
        description: 'Give you a Username'
    })
})

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName === "info") {
            const sex = faker.name.sex();
            const fullName = faker.name.fullName({
                sex: sex,
            });

            await interaction.reply({
                content: `Your identity is of ${sex} and your name is ${fullName}`
            })

        } else if (interaction.commandName === "username") {
            const username = faker.internet.userName();

            await interaction.reply({
                content: `Your username is ${username} `
            })
        }
    }
})

client.login(process.env.TOKEN)
