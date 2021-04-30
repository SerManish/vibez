const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// defines User's schema
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid')
			}
		}
	},
	handle: {
        type: String,
        required: true,
        trim:true,
        unique: true
	},
	password: {
		type: String,
		required: true
	},
	status: {
        type: String,
        default : "offline"
    },
	tokens: [{
			token : {
				type : String,
				required : true
			}
		}
	]
});

// runs everytime before user is saved and hashing the password if it is not hashed yet using bcrypt
// here standard funtion is used because of this binding 
userSchema.pre('save', async function (next){
	if(this.isModified('password')){
		this.password = await bcrypt.hash(this.password,8);
	}
	next();
})

// finds user by handle and verifies it's password 
// throws error if either user or password is wrong otherwise returns user
userSchema.statics.findByCredentials = async (handle,password) => {
	user = await User.findOne({ handle });
	if(user)
	{
		const isMatch = await bcrypt.compare(password, user.password);
		if(isMatch)
			return user;
		throw Error(); 	
	}
	throw Error(); 
}

// generates jsonwebtoken and pushes in tokens property of user
// removes expired tokens from the tokens property array and updates the user data in db
// returns the generated token
// here standard funtion is used because of this binding 
userSchema.methods.generateToken = async function (){
	const token = jwt.sign({ _id:this._id }, process.env.SECRET , { expiresIn:'24 hours' });
	this.tokens.push({token});
	this.tokens = this.tokens.filter((token) =>{
		try{
			jwt.verify(token.token,process.env.SECRET);
			return true;
		}
		catch (e){
			return false;
		}
	});
	await this.save();
	return token;
}

// this funtion is called everytime user object is converted into json 
// this hides tokens array, hashed password and version number 
// returns user's public data object excluding above mentioned property
userSchema.methods.toJSON = function (){
	userPublicData = this.toObject();
	delete userPublicData.tokens;
	delete userPublicData.password;
	delete userPublicData.__v;
	return userPublicData;
}

const User = mongoose.model('User',userSchema);

module.exports = User;