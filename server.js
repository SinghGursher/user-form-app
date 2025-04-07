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
    try {
        const { name, email, phone } = req.body;
        const user = new User(name, email, phone);

        const id = await userDao.save(user);
        res.status(201).json({ id, message: 'User saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Error saving user' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});