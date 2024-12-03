const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[0-9]).{6,}$/; // Минимум 6 символов, одна цифра
    return passwordRegex.test(password);
};

const validateRegistration = ({ username, email, password }) => {
    if (!username.trim() || !email.trim() || !password.trim()) {
        return 'Все поля должны быть заполнены.';
    }
    if (!isPasswordValid(password)) {
        return 'Пароль должен быть не менее 6 символов и содержать хотя бы одну цифру.';
    }
    return null; // Ошибок нет
};

// Экспорт функций
module.exports = { isPasswordValid, validateRegistration };