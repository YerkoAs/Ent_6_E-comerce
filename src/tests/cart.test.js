require('../models')
const request = require("supertest")
const app = require("../app")
const Product = require("../models/Product")
const Category = require("../models/Category")

let TOKEN

let userId

let cartId

let product

let category

const LOGIN_URL = '/api/v1/users/login'

const BASE_URL = '/api/v1/cart'

const newCart = {quantity: 20}

beforeAll(async () => {
    const user = {
        email: 'yerko@gmail.com',
        password: 'yerko123'
    }

    
    const res = await request(app)
    .post(LOGIN_URL)
    .send(user)
    
    TOKEN = res.body.token
    userId = res.body.user.id
    
    category = await Category.create({name: 'clothes'})
    
    product = await Product.create({
            title: 'polo t-shirt',
            description: 'fljdkfbkfdjnbbkfdjbndkfjbndfknbkfj ',
            categoryId: category.id ,
            price: 150 
    })
    
    cart = {
        userId: userId,
        productId: product.id,
        quantity: 3
    }
})

afterAll( async () => {
    await product.destroy()
    await category.destroy()
})

test('POST -> BASE_URL, should return statusCode 201, and res.body.userId === cart.userId', async () => {
    const res = await request(app)
    .post(BASE_URL)
    .send(cart)
    .set('Authorization',`Bearer ${TOKEN}`)

    cartId = res.body.id

    //console.log(res)

expect(res.status).toBe(201)
expect(res.body).toBeDefined()
expect(res.body.productId).toBeDefined()
expect(res.body.productId).toBe(cart.productId)
})

test('GET -> BASE_URL, should return statusCode 200, and res.body.length === 1', async () => {
    const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

    //console.log(res.body[0])

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body).toHaveLength(1)
})

test('GET -> BASE_URL/cartId, should return statusCode 200, and res.body.quantity === cart.quantity', async () => {
    const res = await request(app)
    .get(`${BASE_URL}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    //console.log(res.body)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.quantity).toBe(cart.quantity)
})

test('PUT -> BASE_URL/cartId, should return statusCode 200, and res.body.quantity === newCart.quantity', async () => {
    const res = await request(app)
    .put(`${BASE_URL}/${cartId}`)
    .send(newCart)
    .set('Authorization', `Bearer ${TOKEN}`)


expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.quantity).toBe(newCart.quantity)
})

test('DELETE -> BASE_URL/cartId, should return statusCode 204', async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    //console.log(res)

expect(res.status).toBe(204)
})