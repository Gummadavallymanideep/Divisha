// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  try {
    const { email, businessName, password, confirmPassword } = req.body;

    // Check if the passwords match
    if (password !== confirmPassword) {
      return res.status(400).render('signup', { error: 'Passwords do not match' });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).render('signup', { error: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      businessName,
      password: hashedPassword,
    });

    await newUser.save();

    res.render('/login');
  } catch (error) {
    console.error(error);
    res.status(500).render('signup', { error: 'Internal Server Error' });
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render('login', { error: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).render('login', { error: 'Invalid email or password' });
    }

    // User authenticated, redirect to the dashboard or any other page
    res.redirect('/auth/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).render('login', { error: 'Internal Server Error' });
  }

  // Dashboard Route
  router.get('/dashboard', (req, res) => {
    res.render('dashboard');
  });

});

module.exports = router;
