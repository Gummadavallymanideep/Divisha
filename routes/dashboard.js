// routes/dashboard.js

const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');

router.get('/', (req, res) => {
    // Render the dashboard view
    res.render('dashboard');
});

router.post('/storeinfo', async (req, res) => {
    try {
      const { address, gst, logo, storeTimings,category,
        subcategory,
        productName,
        MRP,
        SP,
        quantity,
        images } = req.body;
  
      // Create a new store info instance
      const newStoreInfo = new Inventory({
        address,
        gst,
        logo,
        storeTimings, 
        category,
        subcategory,
        productName,
        MRP,
        SP,
        quantity,
        images
      });
  
      // Save the new store info to the database
      await newStoreInfo.save();
  
      res.redirect('/dashboard'); // Redirect to the dashboard page after successful submission
    } catch (error) {
      // Handle any errors
      console.error(error);
      res.render('added-success');
    }
});

module.exports = router;
