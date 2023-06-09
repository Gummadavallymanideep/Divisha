// routes/inventory.js

const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');

router.get('/:sellerId', async (req, res) => {
  const { sellerId } = req.params;

  try {
    const inventory = await Inventory.find({ sellerId });

    res.json({ inventory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
