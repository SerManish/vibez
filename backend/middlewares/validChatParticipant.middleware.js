const Chat = require('../models/chat.model');

// finds the chat from db and checks whether the user is allowed to access the chat or not
// sends status code 401 with an error message if not user is not allowed
module.exports = async (req,res,next) => {
    try{
        const chat = await Chat.findOne({_id : req.params.id});
        if(!chat)
            throw new Error();
        if(!chat.participants.includes(req.user._id))
            throw new Error();
        req.chat = chat;
        next();
    }catch(e){
        res.status(401).send({message : "invalid chat access"});
    }
}