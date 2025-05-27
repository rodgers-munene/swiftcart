const  mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    unique: true
  },
  productName: {
    type: String,
    required: [true, "Please add the product name"],
    maxLength: 100,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    default: ""
  },
  categoryHierarchy: {
    type: [String],
    required: [true, "Please add the category hierarchy"]
  },
  productImages: {
    type: [String],
    default: []
  },
  price: {
    list: {
      type: String,
      default: 0,
      min: 0
    },
    sale: {
      type: String,
      required: true,
      default:0,
      min: 0
    }
  },
  reviews: {
    averageReviewScore: {
      type: Number,
      default: 0
    },
    numberOfReviews: {
      type: Number,
      default: 0
    },
    totalReviewScore: {
      type: Number,
      default: 0
    },
    recentReviews: {
      type: [String],
      default: []
    }
  }
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema)
