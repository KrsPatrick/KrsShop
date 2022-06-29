const Order = require('../../models/order.mongo')

// Create Order

async function createOrder(req, res){
    const newOrder = new Order(req.body)

    try{
        const savedOrder = await newOrder.save()
        res.status(200).json({"Cart": savedOrder})
    } catch(err) {
        res.status(500).json({err})
    }
}

// Update Order

async function updateOrder(req, res) {
    
    try {
        const updatedOrder = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        return res.status(200).json({"updated Order": updatedOrder})
    } catch (error) {
        return res.status(500).json(error)
    }
    
}

// Delete Order

async function deleteOrder(req, res){
    const order = await Order.findById(req.params.id)
    if (!order){
        return res.status(400).json({
            "message": "no order"
        })
    }

    await Order.findByIdAndDelete(req.params.id)
    return res.status(200).json({"message": "Order deleted"})
}

// Get User Orders

async function getUserOrder(req, res){
    const orders = await Order.find({userId: req.params.userId})
    if (!orders){
        return res.status(400).json({
            "message": "no orders"
        })
    }
    return res.status(200).json({orders})
}

// Get all 

async function getAllOrders(req, res){
    try {
        const orders = await Order.find()
        res.status(200).json({"orders": orders})
    } catch(err){
        res.status(500).json({"error": err})
    }
}

// Get monthly income

async function getMonthlyIncome(req, res){
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))

    const income = await Order.aggregate([
        {$match: {createdAt:{$gte: previousMonth}}},
        {
            $project: {
            month: {$month: "$createdAt"},
            sales:"$amount"
            },
        },
        {            
            $group: {
                 _id:"$month",
                total:{$sum: "$sales"}
            },

        },
    ])
    res.status(200).json({"income": income})
}
    

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrder,
    getAllOrders,
    getMonthlyIncome,
}