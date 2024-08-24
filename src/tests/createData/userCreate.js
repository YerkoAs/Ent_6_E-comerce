const User = require("../../models/User")

const userCreate = async() => {
    const user ={
        firstName: 'Yerko',
        lastName: 'Asbun',
        email: 'yerko@gmail.com',
        password: 'yerko123',
        phone: '+59177981830'
    }

    await User.create(user)
}

module.exports = userCreate