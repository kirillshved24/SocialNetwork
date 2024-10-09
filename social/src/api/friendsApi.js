export const fetchUsers = async (currentUsername) => {
    try {
        // Получаем локальных пользователей из localStorage
        const localUsers = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Локальные пользователи:', localUsers);

        // Загружаем пользователей с сервера
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const serverUsers = await response.json();
        console.log('Пользователи с сервера:', serverUsers);

        // Объединяем пользователей с сервера и из localStorage, исключая текущего пользователя
        const allUsers = [...localUsers, ...serverUsers];
        console.log('Все пользователи:', allUsers);

        const uniqueUsers = allUsers.filter((user, index, self) =>
            index === self.findIndex((u) => u.id === user.id)
        );

        const filteredUsers = uniqueUsers.filter(user => user.username !== currentUsername);
        console.log('Пользователи без текущего:', filteredUsers);

        return filteredUsers.map(user => ({
            id: user.id || Date.now(),
            username: user.username
        }));
    } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
        return [];
    }
};