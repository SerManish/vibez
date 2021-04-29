const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
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

module.exports = User;