require('../models')
const request = require("supertest")
const app = require("../app")
const Product = require("../models/Product")
const Category = require("../models/Category")
const Cart = require('../models/Cart')

let TOKEN

let userId

let product

let category

const LOGIN_URL = '/api/v1/users/login'

const BASE_URL = '/api/v1/purchase'

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
    
    category = await Category.create({name: 'Cars'})
    
    product = await Product.create({
            title: 'Nissan Centra',
            description: 'fljdkfbkfdjnbbkfdjbndkfjbndfknbkfj ',
            categoryId: category.id ,
            price: 9000
    })
    
    purchase = await Cart.create( {
        quantity: 3,
        userId: userId,
        productId: product.id,
        
    })

})

afterAll( async () => {
    await product.destroy()
    await category.destroy()
})

test('POST -> BASE_URL, should return statusCode 201, and res.body.userId === cart.userId', async () => {
    const res = await request(app)
    .post(BASE_URL)
    .send(purchase)
    .set('Authorization',`Bearer ${TOKEN}`)

    //console.log(res)

expect(res.status).toBe(201)
expect(res.body).toBeDefined()
expect(res.body[0].productId).toBeDefined()
expect(res.body[0].productId).toBe(purchase.productId)
})

test('GET -> BASE_URL, should return statusCode 200, res.body.length === 1', async () => {
    const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

    //console.log(res.body)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body[0].userId).toBeDefined()
expect(res.body).toHaveLength(1)
})