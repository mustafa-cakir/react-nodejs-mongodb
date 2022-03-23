/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import FetchIEX from './index';
import { IEX_BASE_DOMAIN } from '../constants/apis';

const testApi = '/stock/AAPL/quote';
const mockQuote = {
    companyName: 'Apple Inc',
    // some other data
};

const server = setupServer(
    rest.get(`${IEX_BASE_DOMAIN}${testApi}`, (req, res, ctx) =>
        // return mock data
        res(ctx.json(mockQuote)),
    ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('FetchIEX Common API Method', () => {
    it('should make fetch request', async () => {
        const data = await FetchIEX(testApi);
        expect(data?.companyName).toBe(mockQuote?.companyName);
    });
    it('should return error properly', async () => {
        // error message that presumed to be returned from server
        const mockErrorMessage = 'sample error message goes here';
        // overwrite mock data and simulate the server error
        server.use(
            rest.get(`${IEX_BASE_DOMAIN}${testApi}`, (req, res, ctx) =>
                res(
                    // Send a valid HTTP status code
                    ctx.status(403),
                    // And a response body, if necessary
                    ctx.json(mockErrorMessage),
                ),
            ),
        );
        let error;

        try {
            await FetchIEX(testApi);
        } catch (err) {
            error = JSON.parse((err as Error)?.message) as string;
        }

        expect(error).toBe(mockErrorMessage);
    });
});
