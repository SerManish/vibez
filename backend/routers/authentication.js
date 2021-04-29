const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')

const router = new express.Router();

router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        user.password = await bcrypt.hash(user.password,8);
        const token = jwt.sign({ _id:user._id }, process.env.SECRET , { expiresIn:'24 hours' });
        user.tokens.push({token});
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send();
    }
});

router.post('/login', async (req, res) => {
    try {
        user = await User.findOne({ handle: req.body.handle});
        if(user)
        {
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if(isMatch)
            {
                const token = jwt.sign({ _id:user._id }, process.env.SECRET , { expiresIn:'10 seconds' });
                user.tokens.push({token});
                user.tokens = user.tokens.filter((token) =>{
                    try{
                        jwt.verify(token.token,process.env.SECRET);
                        return true;
                    }
                    catch (e){
                        return false;
                    }
                });
                await user.save();
                return res.send(user);
            }
                
        } 
        res.status(400).send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/logout', auth, async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.user.save();
        res.send();
    }
    catch{
        res.status(500).send();
    }
});

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