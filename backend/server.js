const express = require('express')
const mysql = require('mysql')

const app = express()

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'healthcare'
});

app.get('/api/users', (req, res) => {
    // Fetch all users from the "users" table
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});


app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    // Insert a new user into the "users" table
    pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'User created successfully' });
        }
    });
});


app.post('/api/v1/login', (req, res) => {
    const { username } = req.body
    pool.query('SELECT * FROM users WHERE (username) VALUES (?)', [username], (error, results) => {
        if (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'User logged in successfully' });
        }
    })
})

app.get('/api/v1/appointment/list', (req, res) => {
    pool.query('SELECT * FROM appointments', (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    })
})







// app.get('/api/users', (req, res) => {
//     // Handle GET request for fetching users
//     // You can write your logic here
//     res.json({ message: 'Get all users' });
// });


// app.post('/api/users', (req, res) => {
//     // Handle POST request for creating a new user
//     // You can write your logic here
//     res.json({ message: 'Create user' });
// });



const port = 3000; // Use any port number you prefer
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
