const mongoose = require('mongoose');
const User = require('./user.model');

// defines Chat's schema
const chatSchema = new mongoose.Schema({
    type : {
        type : String,
        required: true,
    },
    participants : {
        type : [mongoose.Schema.Types.ObjectId]
    },
    messages : [{
        senderID : mongoose.Schema.Types.ObjectId,
        chatID : mongoose.Schema.Types.ObjectId,
        messageContent : String,
        time : Date
    }]
});

// this funtion is called everytime user object is converted into json 
// this hides version number 
// returns user's public data object excluding above mentioned property
// here standard funtion is used because of this binding 
chatSchema.methods.toJSON = function() {
    publicChat = this.toObject();
    delete publicChat.__v;
    return publicChat;
};

chatSchema.methods.addChatToUsers = async function() {
    await Promise.all(this.participants.map(async (id) => {
            user = await User.findById(id);
            if(user)
            {
                user.chats.push(this._id);
                await user.save();
            }
    }));
};

const Chat = new mongoose.model('Chat',chatSchema);

module.exports = Chat;