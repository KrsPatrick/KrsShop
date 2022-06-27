const CryptoJS = require('crypto-js')

const User = require('./user.mongo')

// Create New User
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

async function getUserMail(mail){
    const mailAdress = await User.findOne({
        email: mail
    })
    return mailAdress
}

module.exports = {
    createNewUser,
    getUserByUsername,
    getUserMail,
    
}