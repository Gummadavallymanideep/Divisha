// routes/search.js

const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');

router.get('/', async (req, res) => {
  const { query } = req.query;

  try {
    const results = await Inventory.find({ productName: { $regex: query, $options: 'i' } });

    res.json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
