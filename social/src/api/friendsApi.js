// Асинхронная функция для получения пользователей, исключая текущего пользователя по имени.
export const fetchUsers = async (currentUsername) => {
    try {
        // Получаем сохраненных пользователей из локального хранилища, если они существуют, 
        // и парсим их в массив, или устанавливаем пустой массив, если данные отсутствуют.
        const localUsers = JSON.parse(localStorage.getItem('users')) || [];
        
        // Отправляем запрос на сервер для получения списка пользователей с JSONPlaceholder.
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Преобразуем ответ от сервера в JSON формат, чтобы получить массив пользователей.
        const serverUsers = await response.json();
        
        // Объединяем массивы локальных и серверных пользователей в один массив.
        const allUsers = [...localUsers, ...serverUsers];
        
        // Фильтруем массив allUsers, чтобы оставить только уникальных пользователей по их id.
        const uniqueUsers = allUsers.filter((user, index, self) =>
            index === self.findIndex((u) => u.id === user.id)
        );

        // Исключаем из массива uniqueUsers пользователя с именем, совпадающим с currentUsername.
        const filteredUsers = uniqueUsers.filter(user => user.username !== currentUsername);

        // Преобразуем отфильтрованный массив пользователей в нужный формат с полями id и username.
        // Если у пользователя нет id, используем текущую метку времени в качестве уникального идентификатора.
        return filteredUsers.map(user => ({
            id: user.id || Date.now(),
            username: user.username
        }));
    } catch (error) {
        // Обрабатываем возможные ошибки и выводим их в консоль.
        console.error('Ошибка при загрузке пользователей:', error);
        // В случае ошибки возвращаем пустой массив.
        return [];
    }
};