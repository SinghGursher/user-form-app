const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase with Service Role
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY // Service Role Key
);

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

app.listen(process.env.PORT || 3000);