import mongoose from 'mongoose';
import config from '../config/index'

export const initDB = () => {
	mongoose.connect(config.DB_URL);

	mongoose.connection.once('open', () => {
		console.log('Connected to db');
	})

	mongoose.connection.on('error', console.error);
}