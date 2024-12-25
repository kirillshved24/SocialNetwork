const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

// Настройка CORS
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Подключение к базе данных
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
    } else {
        console.log('Подключено к базе данных SQLite');
    }
});

// 1. Добавление друга
app.post('/friends', (req, res) => {
    console.log('POST /friends получен запрос', req.body); // Логируем тело запроса
    const { userId, friendId } = req.body;
    console.log('Запрос на добавление друга: userId:', userId, 'friendId:', friendId);
    if (!userId || !friendId) {
        console.error('userId или friendId не переданы');
        return res.status(400).json({ error: 'userId и friendId обязательны' });
    }

    const queryCheck = 'SELECT * FROM friends WHERE userId = ? AND friendId = ?';
    db.get(queryCheck, [userId, friendId], (err, row) => {
        if (err) {
            console.error('Ошибка проверки в базе данных:', err);
            return res.status(500).json({ error: 'Ошибка проверки друга', details: err.message });
        }

        if (row) {
            console.log('Друзья уже существуют:', row);
            return res.status(400).json({ error: 'Вы уже друзья' });
        }

        const queryInsert = 'INSERT INTO friends (userId, friendId) VALUES (?, ?)';
        db.run(queryInsert, [userId, friendId], function (err) {
            if (err) {
                console.error('Ошибка добавления друга:', err);
                return res.status(500).json({ error: 'Ошибка добавления друга', details: err.message });
            }

            console.log(`Друг добавлен: ${userId} - ${friendId}, ID записи: ${this.lastID}`);
            return res.status(201).json({ id: this.lastID, userId, friendId });
        });
    });
});
// 2. Удаление друга
app.delete('/friends', (req, res) => {
    console.log('DELETE /friends получен запрос', req.body);
    const { userId, friendId } = req.body;

    if (!userId || !friendId) {
        return res.status(400).json({ error: 'userId и friendId обязательны для удаления' });
    }

    const queryDelete = 'DELETE FROM friends WHERE userId = ? AND friendId = ?';
    db.run(queryDelete, [userId, friendId], function (err) {
        if (err) {
            console.error('Ошибка при удалении друга:', err);
            return res.status(500).json({ error: 'Ошибка при удалении друга', details: err.message });
        }

        console.log(`Удален друг: ${userId} - ${friendId}`);
        res.status(200).json({ message: 'Друг удален успешно' });
    });
});

// 3. Получение пользователей
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Ошибка получения пользователей:', err);
            return res.status(500).json({ error: 'Ошибка получения пользователей', details: err.message });
        }
        res.status(200).json(rows);
    });
});

// Запуск сервера
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});