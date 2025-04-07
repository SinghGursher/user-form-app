require('dotenv').config();
const express = require('express');
const path = require('path'); // Add this line
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST']
}));
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public'))); // Add this line

// Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// API Routes
app.post('/api/users', async (req, res) => {
  try {
    if (!req.body || !req.body.name || !req.body.email) {
      return res.status(400).json({ 
        error: 'Name and email are required' 
      });
    }

    const { data, error } = await supabase
      .from('users')
      .insert([{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone || null
      }])
      .select();

    if (error) throw error;
    res.status(201).json({
      success: true,
      data: data[0]
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ 
      error: err.message || 'Internal server error' 
    });
  }
});

// Handle all other routes by serving index.html
app.get('*', (req, res) => { // Add this block
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;