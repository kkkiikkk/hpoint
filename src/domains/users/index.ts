import { Context } from 'koa';
import * as User from '../../interfaces/user';
import { IResponse } from '../../interfaces/index'
import { UserModel } from '../../db/models/user';
import * as HttpStatus from 'http-status-codes';
import { createUser } from '../../utils/user'

export const postUser = async (ctx: Context): Promise<any> => {
	try {
		const { email, lastName, firstName, password } = <User.ICreatePayload>ctx.request.body


  	const user = await UserModel.findOne({ email }).exec()

  	if (user) {
  		ctx.throw(HttpStatus.BAD_REQUEST, 'This user already exist')
  	}

  	const newUser = await createUser({ email, lastName, firstName, password })

    ctx.response.status = HttpStatus.CREATED;
    ctx.body = {
    	data: newUser,
    };
	}
	catch (error: any) {
		ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = { ...error };
	}
	finally {
		return ctx.body
	}
}


export const getUsers = async (ctx: Context) => {
	try {
		const users = await UserModel.find().exec()

		ctx.response.status = HttpStatus.OK;
    ctx.body = {
    	data: users,
    };
	}
	catch (error: any) {
		ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = { ...error };
	}
	finally {
		return ctx.body
	}
} 

export const getUser = async (ctx: Context) => {
	try {
		const { id } = <User.IUserParams>ctx.params
 		const user = await UserModel.findById(id).exec()

 		if (!user) {
 			ctx.throw(HttpStatus.NOT_FOUND, 'User Not Found')
 		}

		ctx.response.status = HttpStatus.OK;
    ctx.body = {
    	data: user,
    };
	}
	catch (error: any) {
		ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = { ...error };
	}
	finally {
		return ctx.body
	}
}

export const patchUser = async (ctx: Context) => {
	try {
		const { id } = <User.IUserParams>ctx.params
		const payload = <User.IUpdatePayload>ctx.request.body
 		const user = await UserModel.findByIdAndUpdate(id, payload).exec()
		if (!user) {
 			ctx.throw(HttpStatus.NOT_FOUND, 'User Not Found')
 		}

		ctx.response.status = HttpStatus.OK;
    ctx.body = {
    	data: {},
    };
	}
	catch (error: any) {
		ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = { ...error };
	}
	finally {
		return ctx.body
	}
}