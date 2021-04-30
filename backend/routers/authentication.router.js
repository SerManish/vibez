const express = require('express');
const User = require('../models/user.model')
const auth = require('../middlewares/auth.middleware')

const router = new express.Router();

// endpoint for signing up users, sends an object with 2 properties : user and token if successful(201)
// if an error is occured it sends an error object with status code 500
router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        token = await user.generateToken();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(500).send({error : "sign up failed"});
    }
});

// endpoint for logging in users, sends an object with 2 properties : user and token if successful(200)
// if an error is occured it sends an error object with status code 400
router.post('/login', async (req, res) => {
    try {
        user = await User.findByCredentials(req.body.handle,req.body.password); 
        token = await user.generateToken();
        return res.send({user, token});
    }catch (e) {
        res.status(400).send({error : "log in failed"});
    }
});

// endpoint for logging out users, removes the current token from user's data in db which was send with the request
// sends status code 200 on success and 500 otherwise
router.post('/logout', auth, async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token;
        })
        await req.user.save();
        res.send();
    }
    catch{
        res.status(500).send();
    }
});

// endpoint for logging out users, removes all the tokens from user's data in db
// sends status code 200 on success and 500 otherwise
router.post('/logout/all', auth, async (req,res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }
    catch{
        res.status(500).send();
    }
});

module.exports = router;