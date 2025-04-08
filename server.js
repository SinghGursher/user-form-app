require('dotenv').config(); // Add this at the top of server.js

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: '*', // Allow all origins for now
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.static('public')); // Serve static files

// Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY exists:", !!process.env.SUPABASE_KEY);


app.post('/api/users', async (req, res) => {
  console.log("Incoming data:", req.body);
  try {
    // Always set Content-Type header
    res.setHeader('Content-Type', 'application/json');
    
    const { data, error } = await supabase
      .from('users')
      .insert([req.body])
      .select();

    if (error) throw error;
    
    res.status(201).json({
      success: true,
      data: data[0]
    });
    
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: err.message 
      
    });
  }
});

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
// Error handling middleware (add this AFTER your routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

module.exports = app;