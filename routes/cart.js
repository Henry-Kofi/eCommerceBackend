const express = require('express')
const router = express.Router()


const {
    addProductInCart,
    getCartProducts,
    updateProductInCart,
    deleteProductInCart
} = require('../controller/cart')

router.post('/add/:id',addProductInCart)
router.get('/read/:id',getCartProducts)
router.put('/update/:id',updateProductInCart)
router.delete('/delete',deleteProductInCart)

module.exports = router