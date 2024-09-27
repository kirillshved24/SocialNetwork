export const fetchUsers = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Ошибка при загрузке пользователей');
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error(error);
        return [];
    }
};