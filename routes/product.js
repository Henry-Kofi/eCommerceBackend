const express = require('express');
const router = express.Router()

const {addNewProduct,
    getProducts,
    updateProduct,
    deleteProduct} = require("../controller/product")

router.post("/create",addNewProduct);
router.get("/read",getProducts)
router.put("/update/:id",updateProduct);
router.delete("/delete/:id",deleteProduct)

module.exports = router