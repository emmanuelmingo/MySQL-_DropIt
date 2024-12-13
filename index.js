const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Create a MySQL connection with your credentials
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // Your MySQL username
    password: 'mingo',     // Your MySQL password
    database: 'dropit'     // Ensure this is the correct database name
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Serve the signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Handle signup form submission
app.post('/signup', (req, res) => {
    const { username, password, email, phone_number } = req.body;

    console.log('Inserting user:', { username, password, email, phone_number }); // Log data

    const query = 'INSERT INTO users (username, password, email, phone_number) VALUES (?, ?, ?, ?)';
    connection.query(query, [username, password, email, phone_number], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'User registered successfully!', userId: results.insertId });
    });
});

// Endpoint to retrieve users
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        console.log('Fetched users:', results); // Log fetched users
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Handle shutdown
process.on('SIGINT', () => {
    connection.end((err) => {
        console.log('MySQL connection closed.');
        process.exit(err ? 1 : 0);
    });
});