// app.js

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const inventoryRoutes = require('./routes/inventory');
const searchRoutes = require('./routes/search');

const app = express();

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Add middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb+srv://divisha:Divisha24@projectcluster.tx9gp0v.mongodb.net/Divisha?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// Add routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/search', searchRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
