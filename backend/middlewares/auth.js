const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const data = jwt.verify(token,process.env.SECRET);
        const user = await User.findOne({_id:data._id,'tokens.token': token});
        if(!user)
            throw new Error();
        req.user = user;
        req.token = token;
        next();
    }
    catch{
        res.status(401).send({error : "not authenticated"});
    }
}