
// hacer un require de index de models para que nos traiga el categoryId
require('../models')
const request = require("supertest")
const app = require("../app")
const Category = require("../models/Category")

let TOKEN 
let productId
let category
let product

const newProduct = {
    title: 'Iphone 20'
}


const BASE_URL = '/api/v1/products'

const LOGIN_URL = '/api/v1/users/login'

beforeAll(async () => {
    const user = {
        email: 'yerko@gmail.com',
        password: 'yerko123'
    }
    
    const res = await request(app)
    .post(LOGIN_URL)
    .send(user)

    TOKEN = res.body.token

    category = await Category.create({name: 'Phones'})

    product = {
        title: 'Samsung Galaxy',
        description: 'Samsung galaxy S20, a smartphone from one of the best brand in the world ',
        categoryId: category.id ,
        price: 150
    
    }
    
})

afterAll(async () =>{
    category.destroy()
})

test('POST -> BASE_URL, should return statusCode 201, and res.body.title === product.title', async () => {
    const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set('Authorization',`Bearer ${TOKEN}`)

productId = res.body.id

//console.log(res)

expect(res.status).toBe(201)
expect(res.body).toBeDefined()
expect(res.body.title).toBe(product.title)
expect(res.body.categoryId).toBe(category.id)
//validar categoryId

})

test('GET -> BASE_URL, should return statusCode 200, and res.body.length === 1', async () => {
    const res = await request(app)
    .get(BASE_URL)

    //console.log(res.body)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body).toHaveLength(1)
expect(res.body[0].categoryId).toBeDefined()
expect(res.body[0].categoryId).toBe(category.id)
//validar que categoryId este definido
//validar el categoryId

})

test('GET -> BASE_URL/productId, should return statusCode 200, and res.body.price === product.price', async () => {
    const res = await request(app)
    .get(`${BASE_URL}/${productId}`)

    //console.log(res.body)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.title).toBe(product.title)
expect(res.body.categoryId).toBeDefined()
expect(res.body.categoryId).toBe(category.id)
})

test('PUT -> BASE_URL/productId, should return statusCode 200, and res.body.title === newProduct.title', async () => {
    const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .send(newProduct)
    .set('Authorization', `Bearer ${TOKEN}`)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.title).toBe(newProduct.title)
expect(res.body.categoryId).toBeDefined()
expect(res.body.categoryId).toBe(category.id)
})

test('DELETE -> BASE_URL/productId, should return statusCode 204', async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

expect(res.status).toBe(204)
})

//include[]