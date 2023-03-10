import mongoose from 'mongoose';

export enum ACCOUNT_TYPE {
	ORGANISATION = 'organisation',
	VOLUNTEER = 'volunteer',
	REFUGEE = 'refugee',
}

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	country: String,
	city_from: String,
	account_type: { type: String, enum: ACCOUNT_TYPE, default: ACCOUNT_TYPE.REFUGEE },
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
