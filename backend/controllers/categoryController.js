// get categories
const getCategories = async (req, res) => {
    res.json({message: "Get all categories"});
}

// get subcategories

const getSubCategories = async (req, res) => {
    res.json({message: `Get all subcategoris under category: ${req.params.categoryId}`});
}

// get products in a subcategory

const getSubCategoryProducts = async (req, res) => {
    res.json({message: `Get the products under the subcategory: ${req.params.subCategoryId} in: ${req.params.categoryId}`})

}

module.exports = {getCategories, getSubCategories, getSubCategoryProducts}