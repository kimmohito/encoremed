const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const authenticateToken = require('./authMiddleware');

const jwt = require('jsonwebtoken');

const app = express()

app.use(express.json())

app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:8080',
// }));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'healthcare'
});


app.get('/api/v1/users', (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });

app.post('/api/v1/login', (req, res) => {
    const { username, password } = req.body;

    console.log(req.body)

    pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
      if (error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
      else{
        res.json(results)
      }
    })
  
    // TODO: Implement your own logic to authenticate the user's credentials.
    // For example, you could check the credentials against a database.
  
    // Assuming the credentials are valid, generate a JWT token
    // const token = jwt.sign({ username }, 'secretKey', { expiresIn: '1h' });
  
    // Return the generated token as the response
    // res.json({ token });
  });



app.get('/api/v1/users', authenticateToken, (req, res) => {
    // Only authenticated users can access this route
    // You can access the authenticated user's ID using req.userId
    // Handle the request logic here
    res.json({ message: 'Authenticated user' });
  });


// app.get('/api/v1/users', (req, res) => {
//     pool.query('SELECT * FROM users', (error, results) => {
//       if (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//         res.json(results);
//       }
//     });
//   });

// app.post('/api/v1/users', (req, res) => {
//     const { username, password } = req.body;
  
//     pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, results) => {
//       if (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//         res.json(results);
//       }
//     });
//   });




// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     // Authenticate the user (verify username and password)
  
//     // Generate a JWT token
//     const token = jwt.sign({ username }, 'secret_key');
  
//     // Send the token as a response
//     res.json({ token });
//   });



// app.get('/api/users', (req, res) => {
//     // Fetch all users from the "users" table
//     pool.query('SELECT * FROM users', (error, results) => {
//         if (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             res.json(results);
//         }
//     });
// });


// app.post('/api/users', (req, res) => {
//     const { username, password } = res.body;

//     // Insert a new user into the "users" table
//     pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, results) => {
//         if (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             res.json({ message: 'User created successfully' });
//         }
//     });
// });


// app.post('/api/v1/login', (req, res) => {
//     const { username, password } = req.body
//     pool.query('SELECT * FROM users', [username, password], (error, results) => {
//         if (error) {
//             console.error(error)
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             res.json({ message: 'User logged in successfully' });
//         }
//     })
// })

// app.get('/api/v1/appointment/list', (req, res) => {
//     pool.query('SELECT * FROM appointments', (error, results) => {
//         if (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             res.json(results);
//         }
//     })
// })


// app.post('/api/v1/appointment/create', (req, res) => {

//     console.log(res)

//     // const { id, code, appt_datetime, patient, created_at, arrived_at, status } = req.body
//     // pool.query('INSERT INTO appointments (id, code, appt_datetime, patient, created_at, arrived_at, status) VALUES (?, ?, ?, ?, ?, ?)', [id, code, appt_datetime, patient, created_at, arrived_at, status], (error, results) => {
//     //     if (error) {
//     //         console.error(error)
//     //         res.status(500).json({ error: 'Internal Server Error' });
//     //     } else {
//     //         res.json({ message: 'User logged in successfully' });
//     //     }
//     // })
// })







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
