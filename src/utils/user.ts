import { UserModel } from '../db/models/user'
import * as User from '../interfaces/user'


export const createUser = async (payload: User.ICreatePayload) => {
	const newUser = new UserModel(payload);
  await newUser.save();

  return newUser
}