const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
require('dotenv').config();



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQLDB_PASSWORD, 
    database: 'koiCart' 
    
});

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the Backend Server!');
}
);
app.post('/add-koi', (req, res) => {
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

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting koi:', err);
            return res.status(500).json({ error: 'Database insert failed' });
        }
        res.status(200).json({ message: 'Koi added successfully', result });
    });
});


app.get('/get-koi', (req, res) => {
    db.query('SELECT * FROM koi_fish', (err, result) => {
        if (err) {
            console.error('Error fetching koi:', err);
            return res.status(500).json({ error: 'Failed to fetch koi data' });
        }
        res.status(200).json(result);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}
);
