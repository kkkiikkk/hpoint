export interface ICreatePayload {
	email: string,
	password: string, 
	firstName: string,
	lastName: string,
}

export interface IUserParams {
	id: string,
}

export interface IUpdatePayload extends Partial<ICreatePayload> {}