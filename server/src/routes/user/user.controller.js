const CryptoJS = require('crypto-js')
const User = require('../../models/user.mongo')


// Update User
async function updateUser(req, res) {
    if (req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.ENCPASS).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(500).json(error)
    }
    
}

// Delete User

async function deleteUser(req, res){
    const user = await User.findById(req.params.id)
    if (!user){
        return res.status(400).json({
            "message": "no such user"
        })
    }

    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({})
}

// Test User
// function createUser(req, res){
//     const username = req.body.username
//     return res.send(JSON.stringify(username))
// }

module.exports = {
    updateUser,
    deleteUser,
}