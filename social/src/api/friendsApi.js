export const fetchUsers = async (currentUsername) => {
    try {
        const localUsers = JSON.parse(localStorage.getItem('users')) || [];
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const serverUsers = await response.json();

        const allUsers = [...localUsers, ...serverUsers];

        // Нормализуем данные
        const normalizedUsers = allUsers.map(user => ({
            id: user.id || Date.now(),
            username: user.username,
            name: user.name || user.username, // Если `name` отсутствует, используем `username`
            email: user.email || 'not provided', // Подстраховка
        }));

        // Убираем текущего пользователя
        return normalizedUsers.filter(user => user.username !== currentUsername);
    } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
        return [];
    }
};