import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	password: {
		type: String,
		select: false
	},
	email: {
		type: String, 
		index: true,
		unique: true,
	},
}, { timestamps: true });
	
export const UserModel = mongoose.model('user', userSchema);