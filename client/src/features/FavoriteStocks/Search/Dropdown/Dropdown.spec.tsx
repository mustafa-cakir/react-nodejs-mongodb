import React from 'react';
import { render } from '../../../../app/testWrapper';
import Dropdown from './index';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { IEX_BASE_DOMAIN } from '../../../../common/constants/apis';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { store } from '../../../../app/store';

const mockKeyword = 'APPL';
const mockNotExistKeyword = 'NOT-EXIST-SYMBOL';

const mockQuote = {
    companyName: 'Apple Inc',
    symbol: 'AAPL',
};

const server = setupServer(
    rest.get(`${IEX_BASE_DOMAIN}/stock/${mockKeyword}/quote`, (req, res, ctx) =>
        // return mock data
        res(ctx.json(mockQuote)),
    ),
    rest.get(`${IEX_BASE_DOMAIN}/stock/${mockNotExistKeyword}/quote`, (req, res, ctx) =>
        // return mock data
        res(
            // Send a valid HTTP status code
            ctx.status(403),
            // And a response body, if necessary
            ctx.json('Nothing is found'),
        ),
    ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Dropdown Component', () => {
    it('should render dropdown component without any error', () => {
        const addStockToFavCallback = jest.fn();
        render(<Dropdown keyword="" addStockToFavCallback={addStockToFavCallback} />);
    });
    it('should make the search based on the keyword provided and display the results', async () => {
        const addStockToFavCallback = jest.fn();
        render(<Dropdown keyword={mockKeyword} addStockToFavCallback={addStockToFavCallback} />);
        await waitFor(() => screen.getByTestId('dropdown-company-btn')); // wait until fetch is resuilt and AAPL is displayed

        expect(screen.getByTestId('dropdown-company-btn')).toBeInTheDocument();
        expect(screen.getByTestId('dropdown-company-name')).toHaveTextContent(mockQuote?.companyName);
        expect(screen.getByTestId('dropdown-company-symbol')).toHaveTextContent(mockQuote?.symbol);
    });
    it('should display error if nothing is found', async () => {
        const addStockToFavCallback = jest.fn();
        render(<Dropdown keyword={mockNotExistKeyword} addStockToFavCallback={addStockToFavCallback} />);
        await waitFor(() => screen.getByTestId('dropdown-error')); // wait until fetch is resuilt and AAPL is displayed
        expect(screen.getByTestId('dropdown-error')).toHaveTextContent('Nothing is found');
    });
    it('should clicking the button triggeres addStockToFavCallback callbackk', async () => {
        const addStockToFavCallback = jest.fn();
        render(<Dropdown keyword={mockKeyword} addStockToFavCallback={addStockToFavCallback} />);
        await waitFor(() => screen.getByTestId('dropdown-company-btn')); // wait until fetch is resuilt and AAPL is displayed within a clickable button
        fireEvent.click(screen.getByTestId('dropdown-company-btn')); // click the company button
        expect(addStockToFavCallback).toHaveBeenCalled(); // callback should be triggered
    });
    it('should clicking the button add company to state', async () => {
        const addStockToFavCallback = jest.fn();
        render(<Dropdown keyword={mockKeyword} addStockToFavCallback={addStockToFavCallback} />);
        await waitFor(() => screen.getByTestId('dropdown-company-btn')); // wait until fetch is resuilt and AAPL is displayed within a clickable button
        fireEvent.click(screen.getByTestId('dropdown-company-btn')); // click the company button
        const state = store.getState();
        setTimeout(() => {
            // a sync delay is needed (via setTimeout) until redux state gets updated
            expect(state?.favoriteStocks?.quotes?.length).toBe(1);
            expect(state?.favoriteStocks?.quotes?.[0]?.companyName).toBe(mockQuote?.companyName);
            expect(state?.favoriteStocks?.quotes?.[0]?.symbol).toBe(mockQuote?.symbol);
        });
    });
});
