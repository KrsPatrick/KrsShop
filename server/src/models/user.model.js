const CryptoJS = require('crypto-js')

const User = require('./user.mongo')


async function createNewUser(user){
    const newUser = new User({
        username: user.username,
        email: user.email,
        password: CryptoJS.AES.encrypt(user.password, process.env.ENCPASS).toString()
    })

    return await newUser.save()
}

async function getUserByUsername(username){
    const user = await User.findOne({
        username: username
    })

    return user
}




module.exports = {
    createNewUser,
    getUserByUsername,
}