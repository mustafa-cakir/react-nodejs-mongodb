import {
    currenyFormatter,
    getUserStateFromLocalStorage,
    percentageFormatter,
    setUserStateToLocalStorage,
} from './index';
import { IUser } from '../../app/types';

afterAll(() => {
    // clear localStorage after each test cases
    window.localStorage.clear();
});

describe('Utils (helper methods)', () => {
    const dummyUserData: IUser = { listingType: 'table', theme: 'dark', favStocks: ['AAPL'] };

    it('should return null for getUserStateFromLocalStorage on initial user visit', () => {
        const result = getUserStateFromLocalStorage();
        expect(result).toBeNull();
    });
    it('should getUserStateFromLocalStorage and setUserStateToLocalStorage work as expected', () => {
        setUserStateToLocalStorage(dummyUserData);
        const retrieveData = getUserStateFromLocalStorage();
        expect(retrieveData).toEqual(dummyUserData);
    });
    it('should currenyFormatter properly format currencies', () => {
        const result = currenyFormatter(100, 'USD');
        expect(result).toBe('$100.00');
    });
    it('should percentageFormatter properly format percentage', () => {
        const result = percentageFormatter(0.012);
        expect(result).toBe('1.20%');
    });
});
