module.exports = {
    name: "rps",
    description: "Rock, paper, scissors game based on disord reactions.",
    execute (message, args){
        var game_message;
        message.reply('Lets play rock, paper, scissors! Choose an emoji.').then(message_reaction => {
            message_reaction.react("✊")
            .then (() => message_reaction.react("🖐️"))
            .then (() => message_reaction.react("✌️"))
            .catch (() => console.error('One of the emojis failed to react.'));
            game_message = message_reaction;
            const filter = (reaction, user) => {
                return (reaction.emoji.name == "✊" || reaction.emoji.name == "🖐️" || reaction.emoji.name == "✌️") && user.id == message.author.id;
            };
            const collector = game_message.createReactionCollector(filter, {time: 10000});
            collector.on('collect', (reaction, user) => {
                if (reaction.emoji.name == "✊"){
                    //console.log('Reacted with rock.');
                    var random_number = Math.floor(Math.random()*3);
                    if (random_number == 0){
                        message.reply('You picked rock. I picked rock. We tied!');
                    }
                    else if (random_number == 1){
                        message.reply('You picked rock. I picked paper. I win!');
                    }
                    else if (random_number == 2){
                        message.reply('You picked rock. I picked scissors. You win!');
                    }
                    else if (random_number != 0 && random_number != 1 && random_number != 2){
                        message.reply('Error. Random number (0-2) is: '+random_number);
                    }
                }
                else if (reaction.emoji.name == "🖐️"){
                    //console.log('Reacted with paper.');
                    var random_number = Math.floor(Math.random()*3);
                    if (random_number == 0){
                        message.reply('You picked paper. I picked rock. You win!');
                    }
                    else if (random_number == 1){
                        message.reply('You picked paper. I picked paper. We tied!');
                    }
                    else if (random_number == 2){
                        message.reply('You picked paper. I picked scissors. I win!');
                    }
                    else if (random_number != 0 && random_number != 1 && random_number != 2){
                        message.reply('Error. Random number (0-2) is: '+random_number);
                    }
                }
                else if (reaction.emoji.name == "✌️"){
                    //console.log('Reacted with scissors.');
                    var random_number = Math.floor(Math.random()*3);
                    if (random_number == 0){
                        message.reply('You picked scissors. I picked rock. I win!');
                    }
                    else if (random_number == 1){
                        message.reply('You picked scissors. I picked paper. You win!');
                    }
                    else if (random_number == 2){
                        message.reply('You picked scissors. I picked scissors. We tied!');
                    }
                    else if (random_number != 0 && random_number != 1 && random_number != 2){
                        message.reply('Error. Random number (0-2) is: '+random_number);
                    }
                }
                else{
                    console.log('No reaction.');
                    message.reply('No reaction detected. Type `.rps` to play again.')
                }
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            });
            collector.on('end', (collected) => {
                console.log(`Collected ${collected.size} items.`);
            });
        })
        message.channel.send("Not fully functional. Currently being developed.");
    }
}