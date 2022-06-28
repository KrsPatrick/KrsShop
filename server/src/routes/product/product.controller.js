
const Product = require('../../models/product.mongo')

// Create Product

async function createProduct(req, res){
    const newProduct = new Product(req.body)

    try{
        const savedProduct = await newProduct.save()
        res.status(200).json({"New Product": savedProduct})
    } catch(err) {
        res.status(500).json({err})
    }
}

// Update Product

async function updateProduct(req, res) {
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        return res.status(200).json({"updated Product": updatedProduct})
    } catch (error) {
        return res.status(500).json(error)
    }
    
}

// Delete Product

async function deleteProduct(req, res){
    const product = await Product.findById(req.params.id)
    if (!product){
        return res.status(400).json({
            "message": "no such product"
        })
    }

    await Product.findByIdAndDelete(req.params.id)
    return res.status(200).json({"message": "Product deleted"})
}

// Get One Product

async function getProduct(req, res){
    const product = await Product.findById(req.params.id)
    if (!product){
        return res.status(400).json({
            "message": "no such product"
        })
    }
    return res.status(200).json({product})
}

// Get all Products

async function getAllProducts(req, res){
    const queryNew = req.query.new
    const queryCategory = req.query.category
    let products;

    if(queryNew) {
        products = await Product.find().sort({ createdAt: -1}).limit(5)
    } else if (queryCategory) {
        products = await Product.find({
            categorie: {
                $in: [queryCategory]
            }
        })
    } else {
        products = await Product.find()
    }
    
    
    return res.status(200).json({products})
}


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
}