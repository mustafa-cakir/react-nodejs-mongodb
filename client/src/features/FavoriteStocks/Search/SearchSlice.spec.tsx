import { IFavoriteStocks, ISearch } from '../../../app/types';
import searchReducer from './SearchSlice';

describe('Search reducer', () => {
    const initialState: ISearch = {
        quote: null,
        isLoading: false,
        error: null,
    };
    it('should handle initial state', () => {
        expect(searchReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
});
