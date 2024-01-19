const Cart = require('../models/cart')

exports.getCartProducts = async(req,res) => {
    const userId = req.params.id
    try{
        const carts = await Cart.find({userId:userId})
        console.log(carts)
        return res.status(200).json({success:true,carts})
    }catch(err){
        console.log(err)
        return res.status(301).json({message:err})
    }
}

exports.addProductInCart = async(req,res) => {
    const {userId,count} = req.body
    const productId = req.params.id
    try{
        await Cart.create({
            userId,
            productId,
            count
        })
        return res.status(200).json({
            success:true,
            message:'product Added to cart Successfully'})
    }catch(err){
        console.log(err)
        return res.status(302).json({message:err})
    }
}

exports.updateProductInCart = async(req,res) => {
    const {productId,count} = req.body
    try{
        const userId = req.params.id
        await Cart.findOneAndUpdate(
            {userId:userId},
            {userId:userId,productId:productId,count:count},
            {upsert: true}
        )
        console.log('Cart updated successfully')
        res.status(200).json({
            success:true,
            message:'Cart updated successfully' })
    }catch(err){
        console.log(err)
        return res.status(303).json({message:err})
    }
}

exports.deleteProductInCart  = async(req,res) => {
    const {cartId} = req.body 
    try{
        await Cart.findByIdAndDelete(cartId)
        console.log(`Product deleted successfully`)
        return res.status(200).json({success:true, message:'Item deleted'})
    }catch(err){
        console.log(err)
        return res.status(304).json({message:err})
    }
}
