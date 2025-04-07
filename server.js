const express = require('express');
const path = require('path');
const User = require('./models/user');
const createUserDao = require('./dao/userDao'); // Import the factory function
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000; 

require('dotenv').config(); // Load environment variables

// Initialize the Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey); // Create Supabase client

const userDao = createUserDao(supabase); // Create UserDAO instance with Supabase client

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/users', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const user = new User(name, email, phone);

        const id = await userDao.save(user); // Save user and get the ID
        
        res.status(201).send(`User saved with ID: ${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message || 'Error saving user');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});