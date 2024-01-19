const { findByIdAndUpdate } = require('../models/User')
const product = require('../models/product')
exports.addNewProduct = async (req,res) => {
    const {name,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        images} = req.body
    try{
        await product.create({name,description,price,discountPercentage,rating,stock,brand,category,images})
        console.log("Product added successfully")
        return res.json({message:"Product added successfully"})
    }catch(error){
        console.log(error)
        return res.status(400).json({success:false, message:error.message})
    }
}

exports.getProducts = async(req,res) => {
    try{
        const productList = await product.find({})
        console.log(productList)
        return res.json({productList})
    }catch(error){
        console.log(error)
        return res.status(400).json({success:false, message:error.message})
    }
}

exports.updateProduct = async(req,res) => {
    const {name,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        images} = req.body
    try{
        const id=req.params.id;
        await product.findByIdAndUpdate(id,{
        name,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        images
    })
    res.json({message:"Product updated successfully"})
    }catch(error){
        console.log(error)
        return res.status(400).json({success:false, message:error.message})
    }
}

exports.deleteProduct = async(req,res) => {
    try{
        const id = req.params.id;
        await product.findByIdAndDelete(id)
        res.json({message:"Product deleted successfully"})
    }catch(error){
        console.log(error)
        return res.status(400).json({success:false, message:error.message})
    }
}