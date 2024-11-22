const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
    } else {
        console.log('Подключено к базе данных SQLite');
        db.run(`
            CREATE TABLE IF NOT EXISTS friends (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                friendId INTEGER
            )
        `);
    }
});


app.get('/friends', (req, res) => {
    const { userId } = req.query;
    const query = `SELECT * FROM friends WHERE userId = ?`;

    db.all(query, [userId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});


app.post('/friends', (req, res) => {
    const { userId, friendId } = req.body;
    const query = `INSERT INTO friends (userId, friendId) VALUES (?, ?)`;

    db.run(query, [userId, friendId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID, userId, friendId });
        }
    });
});


app.delete('/friends', (req, res) => {
    const { userId, friendId } = req.body;
    const query = `DELETE FROM friends WHERE userId = ? AND friendId = ?`;

    db.run(query, [userId, friendId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Друг успешно удален' });
        }
    });
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});