
export const fetchUsers = async (currentUsername) => {
    try {
       
        const localUsers = JSON.parse(localStorage.getItem('users')) || [];
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const serverUsers = await response.json();
        const allUsers = [...localUsers, ...serverUsers];
        
        const uniqueUsers = allUsers.filter((user, index, self) =>
            index === self.findIndex((u) => u.id === user.id)
        );
        const filteredUsers = uniqueUsers.filter(user => user.username !== currentUsername);
        return filteredUsers.map(user => ({
            id: user.id || Date.now(),
            username: user.username
        }));
    } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
        return [];
    }
};