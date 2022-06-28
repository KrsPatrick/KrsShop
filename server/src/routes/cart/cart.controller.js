const Cart = require('../../models/cart.mongo')

// Create Cart

async function createCart(req, res){
    const newCart = new Cart(req.body)

    try{
        const savedCart = await newCart.save()
        res.status(200).json({"Cart": savedCart})
    } catch(err) {
        res.status(500).json({err})
    }
}

// Update Cart

async function updateCart(req, res) {
    
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        return res.status(200).json({"updated Cart": updatedCart})
    } catch (error) {
        return res.status(500).json(error)
    }
    
}

// Delete Cart

async function deleteCart(req, res){
    const cart = await Cart.findById(req.params.id)
    if (!cart){
        return res.status(400).json({
            "message": "no cart"
        })
    }

    await Cart.findByIdAndDelete(req.params.id)
    return res.status(200).json({"message": "Cart deleted"})
}

// Get User Cart

async function getUserCart(req, res){
    const cart = await Cart.findOne({userId: req.patams.userId})
    if (!cart){
        return res.status(400).json({
            "message": "no cart"
        })
    }
    return res.status(200).json({cart})
}

// Get all 

async function getAll(req, res){
    try {
        const carts = await Cart.find()
        res.status(200).json({"carts": carts})
    } catch(err){
        res.status(500).json({"error": err})
    }
}
    

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getUserCart,
    getAll
}