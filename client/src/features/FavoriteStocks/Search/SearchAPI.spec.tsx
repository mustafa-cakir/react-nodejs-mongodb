import { setupServer } from 'msw/node';
import { rest } from 'msw';
import fetchSearch from './SearchAPI';
import { IEX_BASE_DOMAIN } from '../../../common/constants/apis';
import { makeStore } from '../../../app/store';
import { setUserStateToLocalStorage } from '../../../common/utils';
import { fetchQuotesOnInit } from '../FavoriteStocksAPI';

const testSymbol = 'AAPL';
const nonExistSymbol = 'NON-EXIST-SYMBOL';

const mockQuote = {
    companyName: 'Apple Inc',
    // some other data
};

const mockErrorMessage = 'Not Found';

const server = setupServer(
    rest.get(`${IEX_BASE_DOMAIN}/stock/${testSymbol}/quote`, (req, res, ctx) =>
        // return mock data
        res(ctx.json(mockQuote)),
    ),
    rest.get(`${IEX_BASE_DOMAIN}/stock/${nonExistSymbol}/quote`, (req, res, ctx) =>
        // return mock data
        res(
            // Send a valid HTTP status code
            ctx.status(404),
            // And a response body, if necessary
            ctx.json(mockErrorMessage),
        ),
    ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Fetch Search Api', () => {
    it('should fetch search as expected', async () => {
        // pre-setup for the case
        const mockStore = makeStore(); // create the mock store (so the state updates within this case won't affect other cases)
        await mockStore.dispatch(fetchSearch(testSymbol)); // dispatch the method to fetch search
        const state = mockStore.getState(); // get the state of the mock store

        expect(state.search.quote?.companyName).toBe(mockQuote.companyName);
    });
    it('should fetch search handle error', async () => {
        // pre-setup for the case
        const mockStore = makeStore(); // create the mock store (so the state updates within this case won't affect other cases)
        await mockStore.dispatch(fetchSearch(nonExistSymbol)); // dispatch the method to fetch non-exist symbol
        const state = mockStore.getState(); // get the state of the mock store
        // console.log(state.search.error);
        expect(state.search.error).toBe(JSON.stringify(mockErrorMessage));
    });
});
