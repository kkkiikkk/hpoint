import * as dotenv from 'dotenv'
dotenv.config()

export default {
	DB_URL: process.env.DB_URL as string,
	PORT: process.env.PORT as string,
	NODE_ENV: process.env.NODE_ENV as string
}
