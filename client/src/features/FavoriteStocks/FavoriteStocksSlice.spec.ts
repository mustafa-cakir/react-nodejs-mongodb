import favoriteStocksReducer, { addItemToQuotes, removeItemFromQuotes } from './FavoriteStocksSlice';
import { IFavoriteStocks } from '../../app/types';

describe('FavoriteStocks reducer', () => {
    const initialState: IFavoriteStocks = {
        quotes: [],
        isLoading: false,
        error: null,
    };
    const mockQuote = {
        symbol: 'SMML',
        companyName: 'test company',
        changePercent: 0.01,
        latestPrice: 1,
        currency: 'USD',
    };
    it('should handle initial state', () => {
        expect(favoriteStocksReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle add item to quotes', () => {
        const actual = favoriteStocksReducer(initialState, addItemToQuotes(mockQuote));
        expect(actual?.quotes?.length).toBe(1);
        expect(actual?.quotes?.[0]?.companyName).toBe(mockQuote?.companyName);
    });

    it('should handle remove item from quotes', () => {
        favoriteStocksReducer(initialState, addItemToQuotes(mockQuote)); // first add
        const actual = favoriteStocksReducer(initialState, removeItemFromQuotes(mockQuote?.symbol)); // then remove
        expect(actual?.quotes?.length).toEqual(0);
    });
});
