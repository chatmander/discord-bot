const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("example")
        .setDescription("Example slash command"),
    async execute(interaction) {
        // Check for user mentions
        const taggedUser = interaction.options.getUser("user")
        if (!taggedUser)
            interaction.reply({
                content: "C'mon, tag someone!",
                ephemeral: true,
            })

        // Create the embed for the modal
        const embed = new MessageEmbed()
            .setTitle("Enter an Amount")
            .setDescription("Please enter an amount in the field below.")

        // Create the input field
        const inputField = {
            type: "AMOUNT",
            name: "amount",
            description: "Enter a amount",
            required: true,
        }

        // Create the action row for the buttons
        const actionRow = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("submit_button")
                .setLabel("Approve the transaction")
                .setStyle("PRIMARY")
        )

        // Create the modal
        interaction
            .reply({
                embeds: [embed],
                components: [actionRow],
                ephemeral: true,
            })
            .then(() => {
                // Set up the event listener for when the submit button is clicked
                const filter = (i) =>
                    i.customId === "submit_button" &&
                    i.user.id === interaction.user.id
                const collector =
                    interaction.channel.createMessageComponentCollector({
                        filter,
                        time: 600000,
                    }) // Timeout after 60 seconds

                collector.on("collect", (i) => {
                    const number = i.values[0] // Get the number entered by the user
                    // Do something with the number (e.g. save it to a database, perform a calculation)

                    // Send a response message to the user
                    i.update({
                        content: `You entered the number ${number}`,
                        components: [],
                        embeds: [],
                    })
                })

                collector.on("end", (collected) => {
                    // If the user did not click the button within the specified timeout, send an error message
                    if (collected.size === 0) {
                        interaction.followUp(
                            "You did not enter a number within the specified time."
                        )
                    }
                })
            })

        // create a discord modal with a number field
    },
}
