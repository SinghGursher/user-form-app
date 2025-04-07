require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST']
}));

// Middleware
app.use(express.json());

// Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.path}`);
  next();
});

// API Routes
app.post('/api/users', async (req, res) => {
  try {
    // Validate request body
    if (!req.body || !req.body.name || !req.body.email) {
      return res.status(400).json({ 
        error: 'Name and email are required' 
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone || null
      }])
      .select();

    if (error) throw error;

    // Return created record
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

// Health Endpoints
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Server is running - use /api endpoints',
    endpoints: {
      users: 'POST /api/users',
      health: 'GET /api/health'
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Supabase URL: ${process.env.SUPABASE_URL}`);
});

module.exports = app;