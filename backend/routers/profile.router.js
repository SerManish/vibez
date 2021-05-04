const express = require('express');
const auth = require('../middlewares/auth.middleware');
const User = require('../models/user.model');

const router = new express.Router();

router.get('/user/:id',auth, async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(user)
            res.send(user);
        res.status(400).send();
    }catch(e){
        res.status(500).send();
    }
});



module.exports = router;