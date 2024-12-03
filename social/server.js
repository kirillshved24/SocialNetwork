const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
    } else {
        console.log('Подключено к базе данных SQLite');
    }
});

// Секретный ключ для подписи JWT токенов
const JWT_SECRET = 'your_secret_key';

// Регистрация пользователя
app.post('/sign-up', async (req, res) => {
    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
    }

    // Хешируем пароль перед сохранением
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, email, password, isAdmin) VALUES (?, ?, ?, ?)';
    db.run(query, [username, email, hashedPassword, isAdmin || false], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при регистрации' });
        }

        res.status(201).json({
            id: this.lastID,
            username,
            email,
            isAdmin: isAdmin || false,
        });
    });
});

// Вход пользователя
app.post('/sign-in', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Все поля обязательны для входа' });
    }

    // Поиск пользователя по имени
    const query = 'SELECT * FROM users WHERE username = ?';
    db.get(query, [username], async (err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
        }

        // Сравниваем пароли
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
        }

        // Создаем JWT токен
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Вход успешен',
            token,
            user: { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin },
        });
    });
});

// Пример защищенного маршрута
app.get('/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'Нет доступа' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Неверный или просроченный токен' });
        }

        res.json({ message: 'Доступ разрешен', user: decoded });
    });
});

// Запуск сервера
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});