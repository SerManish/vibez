const express = require('express');
const auth = require('../middlewares/auth.middleware')

const router = new express.Router();

router.post('/test',auth, (req,res)=>{
    res.send({message : "you are authenticated"});
})

module.exports = router;