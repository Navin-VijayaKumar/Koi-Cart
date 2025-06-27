const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
require('dotenv').config();
const jwt = require('jsonwebtoken');



const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQLDB_PASSWORD,
    database: 'koiCart',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});



const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the Backend Server!');
}
);
app.post('/add-koi', async (req, res) => {
    const {
        id,
        name,
        description,
        size_cm,
        price,
        Farm_name,
        stock,
        age,
        address,
        location,
        offer_percentage,
        image_url1,
        image_url2,
        image_url3,
        video_url
    } = req.body;

    const sql = `
    INSERT INTO koi_fish (
      id, name, description, size_cm, price, Farm_name,
      stock, age, address, location, offer_percentage,
      image_url1, image_url2, image_url3, video_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
        id, name, description, size_cm, price, Farm_name,
        stock, age, address, location, offer_percentage,
        image_url1, image_url2, image_url3, video_url
    ];

    try {
        const [result] = await pool.query(sql, values);
        res.status(200).json({ message: 'Koi added successfully', result });
    } catch (err) {
        console.error('Error inserting koi:', err);
        res.status(500).json({ error: 'Database insert failed' });
    }
});

app.get('/get-koi', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM koi_fish');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching koi:', err);
        res.status(500).json({ error: 'Failed to fetch koi data' });
    }
});


app.post('/delete-koi', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required to delete koi' });
  }

  const sql = 'DELETE FROM koi_fish WHERE id = ?';

  try {
    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Koi not found' });
    }

    res.status(200).json({ message: 'Koi deleted successfully' });
  } catch (err) {
    console.error('Error deleting koi:', err);
    res.status(500).json({ error: 'Failed to delete koi' });
  }
});


// Signup Route
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user exists
        const [existingUsers] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        await pool.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        res.status(200).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Signup error", error: error.message });
    }
});


// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.json({ token, userId: user.id, username: user.username });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login error", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}
);
