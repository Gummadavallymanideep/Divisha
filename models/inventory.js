// models/Inventory.js

const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gst: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  storeTimings: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  sp: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  images: [String],
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
