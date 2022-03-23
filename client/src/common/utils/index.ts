import { IUser } from '../../app/types';

export const getUserStateFromLocalStorage = (): IUser | null => {
    try {
        const user = localStorage.getItem(`user_data`);
        if (user) return JSON.parse(user) as IUser;
    } catch (err) {
        // error locaStorage
    }
    return null;
};

export const setUserStateToLocalStorage = (user: IUser): void => {
    try {
        localStorage.setItem(`user_data`, JSON.stringify(user));
    } catch (err) {
        // error locaStorage
    }
};

export const debounce = (callback: (...arg: any[]) => void, wait = 500) => {
    let timeout: NodeJS.Timeout;
    return (...args: unknown[]) => {
        const next = () => callback(...args);
        clearTimeout(timeout);
        timeout = setTimeout(next, wait);
    };
};

export const currenyFormatter = (price: number, currency = 'USD'): string => {
    return price?.toLocaleString('en-US', {
        style: 'currency',
        currency,
    });
};

export const percentageFormatter = (percentage: number): string => {
    return percentage?.toLocaleString('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
    });
};
