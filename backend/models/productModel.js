const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  reviewerName: {
    type: String,
    required: true
  },
}, { _id: false });

const metaSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  barcode: { type: String, required: true },
  qrCode: { type: String, required: true }
}, { _id: false });

const dimensionsSchema = new mongoose.Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true }
}, { _id: false });

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  tags: {
    type: [String],
    default: []
  },
  brand: {
    type: String,
    
  },
  sku: {
    type: String,
    required: true,
    trim: true
  },
  weight: {
    type: Number,
    required: true
  },
  dimensions: {
    type: dimensionsSchema,
  },
  warrantyInformation: {
    type: String,
    default: 'No warranty'
  },
  shippingInformation: {
    type: String,
    default: 'Ships within 5-7 business days'
  },
  availabilityStatus: {
    type: String,
    required: true
  },
  reviews: {
    type: [reviewSchema],
    default: []
  },
  returnPolicy: {
    type: String,
    default: 'No return policy'
  },
  minimumOrderQuantity: {
    type: Number,
    required: true,
    min: 1
  },
  images: {
    type: [String],
    required: true,
    validate: [array => array.length > 0, 'At least one image is required']
  },
  thumbnail: {
    type: String,
    
  }
}, {
  timestamps: true
});


productSchema.index({
  title: 'text',
  brand: 'text',
  category: 'text'
}, {
  weights: {
    title: 5,    // Highest priority
    brand: 3,
    category: 2
  },
  name: 'product_search_index'
});

module.exports = mongoose.model('Product', productSchema);
