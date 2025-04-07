// server.js
const express = require('express');
const path = require('path');
const User = require('./models/user');
const userDao = require('./dao/userDao');
import { createClient } from '@supabase/supabase-js'; // Import Supabase Client

const app = express();
const PORT = process.env.PORT || 3000; 

// Load environment variables
require('dotenv').config(); // Make sure to have this at the top to load your .env file

// Initialize the Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey); // Create Supabase client

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Express endpoint to handle user creation
app.post('/api/users', async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // First, save the user using your existing userDao (if needed)
        const user = new User(name, email, phone);
        const id = await userDao.save(user); // Assuming this saves the user locally

        // Now insert the user into Supabase
        const { data, error } = await supabase
            .from('users') // Use your actual table name in Supabase
            .insert([{ name, email, phone }]);

        if (error) {
            console.error('Error inserting into Supabase:', error);
            return res.status(500).send('Error saving user in Supabase');
        }

        res.send(`User saved with ID: ${id} and added to Supabase with new ID: ${data[0].id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving user');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});