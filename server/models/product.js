import mongoose from 'mongoose';

// Product Schema for the model. This is the list of all options user will have to fill in during signing up.
const prodSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'name is required.'],
  },
  category: {
    type: String,
    required: [true, 'category required',],
  },
  price: {
    type: Number,
    required: [true, 'price of product is required.'],
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'vendor ID is required.'],
  },
  description: {
    type: String,
    required: [true, 'product description is required.'],
  },
  wishlisted: {
    type: Boolean,
    default: false,
  },
  imageUrls: {
    type: [String],
    default: ["https://olumsx.s3.eu-north-1.amazonaws.com/bluejeans-1", "https://olumsx.s3.eu-north-1.amazonaws.com/bluejeans-2", "https://olumsx.s3.eu-north-1.amazonaws.com/bluejeans-3"]
  }
}, { timestamps: true });

const Product = new mongoose.model ('Product', prodSchema);

export default Product;

