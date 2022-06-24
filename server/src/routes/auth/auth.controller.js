const CryptoJS = require('crypto-js')

const {createNewUser, getUserByUsername} = require('../../models/user.model')

// Create New User

async function httpCreateNewUser(req, res){
    const user = req.body

    if (!user.username || !user.email || !user.password) {
        return res.status(400).json({ 
            error: 'Missing required property'
        })
    }

    const newUser = await createNewUser(user)


    return res.status(200).json(newUser)

}

// Login User

async function loginUser(req, res){
    const data = req.body

    const user = await getUserByUsername(data.username)
    
    if (!user){
        return res.status(400).json({
            message: "wrong username or password"
        })
    }

    const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.ENCPASS);
    const originalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8)

    console.log(originalPassword)

    if (data.password !== originalPassword){
        return res.status(400).json({
            message: "wrong username or password test"
        })
    }

    return res.status(200).json(user)
}

module.exports = {
    httpCreateNewUser,
    loginUser,
}