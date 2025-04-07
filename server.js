const express = require('express');
const path = require('path');
const User = require('./models/user');
const userDao = require('./dao/userDao');
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/users', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const user = new User(name, email, phone);
        const id = await userDao.save(user);
        res.send(`User saved with ID: ${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving user');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});