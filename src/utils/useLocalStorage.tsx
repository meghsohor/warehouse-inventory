import { useState, useEffect } from 'react';

function getSavedValue(key: any, initialValue: any) {
    const savedValue = JSON.parse(localStorage.getItem(key) || '');
    if (savedValue) return savedValue;

    if (initialValue instanceof Function) return initialValue();
    return initialValue;
}

export default function useLocalStorage(key:any, initialValue:any) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return [value, setValue];
}