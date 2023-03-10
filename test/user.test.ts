import supertest from 'supertest';
import { app } from '../src/main'
import { initDB } from '../src/db/index'


let request: supertest.SuperTest<supertest.Test>;
describe('User CRUD API', () => {
    beforeAll(async () => {
        await initDB()
        request = supertest(app.callback())
    })
    const userPayload = {
        firstName: "User",
        lastName: "User Last Name",
        email: "usermail@gmail.com",
        password: "user228"
    }
    let userId = ''
    test('Create user', async () => {
        const response = await request.post('/api/user').send(userPayload)
        expect(response.status).toBe(201)
        expect(response.body.data.firstName).toBe(userPayload.firstName)
        userId = response.body.data._id
    })

    test('Create an existing user', async () => {
        const response = await request.post('/api/user').send(userPayload)
        expect(response.status).toBe(400)
    })

    test('Get users', async () => {
        const response = await request.get('/api/users')
        expect(response.status).toBe(200)
        expect(response.body.data[0].firstName).toBe(userPayload.firstName)
    })

    test('Get user by valid id', async () => {
        const response = await request.get(`/api/user/${userId}`)
        expect(response.status).toBe(200)
        expect(response.body.data.firstName).toBe(userPayload.firstName)
    })

    test('Get user by invalid id', async () => {
        const response = await request.get(`/api/user/640886c240c4e52c37600cb3`)
        expect(response.status).toBe(404)
    })

    test('Delete user by invalid id', async () => {
        const response = await request.delete(`/api/user/640886c240c4e52c37600cb3`)
        expect(response.status).toBe(404)
    })

    test('Delete user by valid id', async () => {
        const response = await request.delete(`/api/user/${userId}`)
        expect(response.status).toBe(200)
    })

    test('Get deleted user by valid id', async () => {
        const response = await request.get(`/api/user/${userId}`)
        expect(response.status).toBe(404)
    })
})
