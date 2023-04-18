const { Client, Intents } = require("discord.js")
const SendEthCommand = require("./example")
const sendEth = require("./sendEth")

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
const token = "your-bot-token-goes-here"

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

const commandConfig = {
    sendEth: { regex: /^(?=.*send)(?=.*eth).+$/, handler: sendEth },
}

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return
    if (interaction.commandName !== "raptures") return

    for (command in commandConfig) {
        // Assuming you have an `interaction` object

        let commandText = "" // Start with the command name

        // Loop through the options and add their values to the command string
        if (interaction.options) {
            interaction.options.forEach((option) => {
                command += ` ${option.value}`
            })
        } // Outputs the full command string

        if (command.regex.test(commandText)) {
            await command.handler(interaction)
        }
    }
})

client.login(token)
