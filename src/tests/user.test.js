const request = require("supertest")
const app = require("../app")
const userCreate = require("./createData/userCreate")

const BASE_URL = '/api/v1/users'

let TOKEN 

beforeAll(async () => {
    const user = {
        email: 'yerko@gmail.com',
        password: 'yerko123'
    }

    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

    TOKEN = res.body.token
    console.log(TOKEN)
})

const user = {
    firstName: 'Jorge',
    lastName: 'Smith',
    email: 'jorge@gmail.com',
    password: 'jorge123',
    phone: '+59164456623'
}



test('POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName', async() => {
    const res = await request(app)
    .post(BASE_URL)
    .send(user)

expect(res.statusCode).toBe(201)
expect(res.body).toBeDefined()
//hacer lo msimo para name frst name, lstname,email,  pssword y phne
expect(res.body.firstName).toBe(user.firstName)
})

test('GET -> BASE_URL, should return statusCode 200, and res.body.length === 2', async() => {
    const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)
    
expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body).toHaveLength(2)
})