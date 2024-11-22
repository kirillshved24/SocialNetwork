export const fetchUsers = async (currentUsername, { get }) => {
    try {
        const localUsers = get('users') || []; // Получаем пользователей из localStorage
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Запрос на сервер
        if (!response.ok) {
            throw new Error(`Ошибка загрузки данных с сервера: ${response.status}`);
        }
        const serverUsers = await response.json();

        // Объединяем локальных и серверных пользователей
        const combinedUsers = [...localUsers, ...serverUsers];

        // Нормализуем данные пользователей
        const normalizedUsers = combinedUsers.map((user, index) => ({
            id: user.id || `local_${index}_${Date.now()}`, // Уникальный id для локальных пользователей
            username: user.username,
            name: user.name || user.username, // Используем имя или имя пользователя
        }));

        // Исключаем текущего пользователя из списка
        return normalizedUsers.filter(user => user.username !== currentUsername);
    } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
        return [];                            
    }
};