const express = require('express');
const auth = require('../middlewares/auth.middleware');
const validChat = require('../middlewares/validChatParticipant.middleware')
const Chat = require('../models/chat.model');

const router = new express.Router();

// test endpoint to check the validity of token
router.post('/test', auth, (req,res)=>{
    res.send({message : "you are authenticated"});
})

router.get('/chat/all', auth, async (req,res)=>{
    try{
        lastChatData = [];
        await Promise.all(req.user.chats.map(async (_id) => {
            chat = await Chat.findById(_id);
            lastChatData.push(chat.messages[chat.messages.length - 1]);
            console.log(lastChatData)
        }));
        res.send(lastChatData);
    }
    catch(e){
        res.status(400).send();
    }
    
});

// endpoint to create a new chat takes all the chat data in body in json form and adds it to the db
// return the newly created chat id is successful else returns status code 400
router.post('/chat/create', auth, async (req,res)=>{
    try{
        newChat = new Chat({...req.body});
        await newChat.save();
        await newChat.addChatToUsers();
        res.send({_id : newChat._id});
    }
    catch(e){
        res.status(400).send();
    }
    
});

// endpoint to get compelete chat by id only if the user is allowed to access
// returns chat object (it will always be successful due to the use of validChat middleware)
router.get('/chat/:id', auth, validChat, (req,res)=>{
    res.send(req.chat);
});

// endpoint to add a message to a chat by id and update it in the db
// return status code 200 else returns status code 400
router.patch('/chat/:id', auth, validChat, async (req,res)=>{
    try{
        req.chat.messages.push(req.body);
        await req.chat.save();
        res.send();
    }catch(e){
        res.status(400).send();
    }
});


module.exports = router;