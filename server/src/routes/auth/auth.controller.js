const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

const {createNewUser, getUserByUsername, getUserMail} = require('../../models/user.model')

// Create New User

async function httpCreateNewUser(req, res){
    const user = req.body

    if (!user.username || !user.email || !user.password) {
        return res.status(400).json({ 
            error: 'Missing required property'
        })
    }

    const dbUser = await getUserByUsername(user.username)
    const mail = await getUserMail(user.email)

    console.log(dbUser);

    if(dbUser){
        return res.status(400).json({
            "message": "username already taken!"
        })
    }

    if(mail){
        return res.status(400).json({
            "message": "email already in use!"
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

    if (data.password !== originalPassword){
        return res.status(400).json({
            message: "wrong username or password test"
        })
    }

    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
    }, 
    process.env.JWT_SECRET_KEY,
    {expiresIn: "3d"})

    return res.status(200).json({accessToken})
}

module.exports = {
    httpCreateNewUser,
    loginUser,
}