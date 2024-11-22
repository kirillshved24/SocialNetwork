import { useCallback } from 'react';

export const useLocalStorage = () => {
    const get = useCallback((key) => {
        try {
            const item = localStorage.getItem(key);
            console.log(`Получение данных из localStorage для ключа "${key}":`, item);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Ошибка при чтении ключа "${key}" из localStorage:`, error);
            return null;
        }
    }, []);

    const set = useCallback((key, value) => {
        try {
            console.log(`Сохранение данных в localStorage для ключа "${key}":`, value);
            const item = JSON.stringify(value);
            localStorage.setItem(key, item);
        } 
 
catch (error) {
            console.error(`Ошибка при записи ключа "${key}" в localStorage:`, error);
        }
    }, []);

    return { get, set };
};