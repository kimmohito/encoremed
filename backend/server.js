const express = require('express');

const app = express();


app.get('/api/users', (req, res) => {
    // Handle GET request for fetching users
    // You can write your logic here
    res.json({ message: 'Get all users' });
});


app.post('/api/users', (req, res) => {
    // Handle POST request for creating a new user
    // You can write your logic here
    res.json({ message: 'Create user' });
});


const port = 3000; // Use any port number you prefer
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
