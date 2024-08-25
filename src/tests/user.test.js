const request = require("supertest")
const app = require("../app")
const userCreate = require("./createData/userCreate")

const BASE_URL = '/api/v1/users'

let TOKEN 

let userId

beforeAll(async () => {
    const user = {
        email: 'yerko@gmail.com',
        password: 'yerko123'
    }

    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

    TOKEN = res.body.token
    //console.log(TOKEN)
})

const user = {
    firstName: 'Jorge',
    lastName: 'Smith',
    email: 'jorge@gmail.com',
    password: 'jorge123',
    phone: '+591 64456623'
}

const userUpdated = {
    firstName: 'Henrique',
    /* lastName: 'Vargas',
    email: 'henrique@gmail.com',
    password: 'enrique123',
    phone: '+591 66289562' */
}

const hits = {
    email: 'jorge@gmail.com',
    password: 'jorge123'
}

const hits2 = {
    email: 'jorge@gmail.com',
    password: 'invalidPassword'
}



test('POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName', async() => {
    const res = await request(app)
    .post(BASE_URL)
    .send(user)

userId = res.body.id

const columns = ['firstName', 'lastName', 'email', 'password', 'phone']

expect(res.statusCode).toBe(201)
expect(res.body).toBeDefined()

columns.forEach((column) => {
    expect(res.body[column]).toBeDefined()
})
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

test('PUT -> BASE_URL/userId, should return statusCode 200, and res.body.firstName === userUpdated.firstName', async () => {
    const res = await request(app)
    .put(`${BASE_URL}/${userId}`)
    .send(userUpdated)
    .set('Authorization',` Bearer ${TOKEN}`)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.firstName).toBe(userUpdated.firstName)
expect(res.body.email).toBe(user.email) //validamos que el password no se actualice
})

test('POST -> BASE_URL/login, should return statusCode 200 and res.body.user.email === hits.email', async () => {
    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(hits)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.user).toBeDefined()
expect(res.body.token).toBeDefined()
expect(res.body.user.email).toBe(hits.email)

})

test('POST -> BASE_URL/login, should return statusCode 401', async () => {
    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(hits2)

expect(res.status).toBe(401)

})

test('DELETE -> BASE_URL/userId, should return statusCode 204', async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

expect(res.status).toBe(204)

})
