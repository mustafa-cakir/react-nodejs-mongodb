import { IUser } from '../../app/types';
import { fetchQuote, fetchQuotesOnInit } from './FavoriteStocksAPI';
import { makeStore } from '../../app/store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { IEX_BASE_DOMAIN } from '../../common/constants/apis';
import { setUserStateToLocalStorage } from '../../common/utils';

const testSymbol1 = 'AAPL';
const testSymbol2 = 'GOOGL';

const mockQuote1 = {
    companyName: 'Apple Inc',
    // some other data
};
const mockQuote2 = {
    companyName: 'Google',
    // some other data
};

const mockUserData: IUser = {
    theme: 'light',
    favStocks: [testSymbol1, testSymbol2],
    listingType: 'table',
};

const server = setupServer(
    rest.get(`${IEX_BASE_DOMAIN}/stock/${testSymbol1}/quote`, (req, res, ctx) =>
        // return mock data
        res(ctx.json(mockQuote1)),
    ),
    rest.get(`${IEX_BASE_DOMAIN}/stock/${testSymbol2}/quote`, (req, res, ctx) =>
        // return mock data
        res(ctx.json(mockQuote2)),
    ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Favorite Stocks Api', () => {
    it('should fetch quote', async () => {
        // pre-setup for the case
        const mockStore = makeStore(); // create the mock store (so the state updates within this case won't affect other cases)
        await mockStore.dispatch(fetchQuote(testSymbol1)); //  dispatch the method to fetch the quote by symbol and await for it
        const state = mockStore.getState(); // get the state of the mock store

        // make the assertions
        expect(state?.favoriteStocks?.quotes.length).toBe(1); // wait until quote counts are 1
        expect(state?.favoriteStocks?.quotes?.[0]?.companyName).toEqual(mockQuote1?.companyName);
    });

    it('should fetch multiple quotes on initial load', async () => {
        // pre-setup for the case
        const mockStore = makeStore(); // create the mock store (so the state updates within this case won't affect other cases)
        setUserStateToLocalStorage(mockUserData); // store the mock user data to localstorage (user saved favIcons are: ['AAPL', 'GOOGL']
        mockStore.dispatch(fetchQuotesOnInit()); // dispatch the method to fetch multi quotes (user's localstorage) and wait for it
        const state = mockStore.getState(); // get the state of the mock store

        // make the assertions
        setTimeout(() => {
            // setTimeout is used because fetchQuotesOnInit doesn't return Promise (beacuse it doesn't have to)
            expect(state?.favoriteStocks?.quotes?.length).toBe(2);
            expect(state?.favoriteStocks?.quotes?.[0]?.companyName).toEqual(mockQuote1?.companyName); // for the first quote
            expect(state?.favoriteStocks?.quotes?.[1]?.companyName).toEqual(mockQuote2?.companyName); // for the second quote
        });
    });
});
