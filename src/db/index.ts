import mongoose from 'mongoose';
import config from '../config/index'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongodb: null | MongoMemoryServer = null

export const initDB = async () => {
	try {
		const isTestEnviroment = process.env.NODE_ENV === 'TEST'
		let dbUrl = ""
		if (isTestEnviroment) {
			console.log("TEST")
      		mongodb = await MongoMemoryServer.create();
      		dbUrl = mongodb.getUri();
    	}

		mongoose.connect(!isTestEnviroment ? config.DB_URL : dbUrl);
	} catch (error) {
		console.log('[initDB]', error)
	}
}


export const disconnectDB = async () => {
	try {
		await mongoose.connection.close();
    	if (mongodb) {
      		await mongodb.stop();
    	}
	} catch (error) {
		console.log('[disconnectDB]', error)
	}
}
