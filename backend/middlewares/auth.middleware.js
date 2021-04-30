const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// checks if provided token is valid or not (time not expired and registed in user's data in db)
// sends status code 401 with an error message if not authenticated 
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
        res.status(401).send({message : "not authenticated"});
    }
}