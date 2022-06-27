const jwt = require('jsonwebtoken')
const { getUserByUsername, getUserById } = require('../models/user.model')

function verifyToken (req, res, next){
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err){
                return res.status(401).json({"message": "No Token"})
            }
            req.user = user;
            next()
        })
    } else {
        return res.status(401).json({"message": "Not authenticated"})
    }
}          

function verifyAuth(req, res, next){
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        } else {
            return res.status(403).json({
                "message": "you are not allowed"
            })
        }
    } )
}   

function verifyIfAdmin(req, res, next){
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next()
        } else {
            return res.status(403).json({
                "message": "you are not allowed"
            })
        }
    } )
}   
   

    
    

module.exports = {
    verifyToken,
    verifyAuth,
    verifyIfAdmin,
}