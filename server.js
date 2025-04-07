const express = require('express');
const path = require('path');
const cors = require('cors');
const User = require('./user');
const createUserDao = require('./dao/userDao');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const userDao = createUserDao(supabase);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/users', async (req, res) => {
    console.log("POST /api/users received"); // Debug log
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([req.body])
        .select();
      
      if (error) throw error;
      res.status(201).json(data[0]);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message });
    }
  });
  
  // Add a test GET route for debugging
  app.get('/api/users', (req, res) => {
    res.send("API is working");
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});