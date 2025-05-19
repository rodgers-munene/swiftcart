
// Get all products
const getProducts = async (req, res) => {
    res.json({message: "Get all the available products"})
}

// Get product Details
const getProductDetails = async (req, res) => {
    res.json({message: `Get product details for ${req.params.id}`})
}


module.exports = {getProducts, getProductDetails}