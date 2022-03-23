import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from '../../../app/testWrapper';
import FavoriteStocksSearch from './index';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { IEX_BASE_DOMAIN } from '../../../common/constants/apis';

const testSymbol = 'AAPL';

const mockQuote = {
    companyName: 'Apple Inc',
    symbol: 'AAPL',
    // some other data
};

const server = setupServer(
    rest.get(`${IEX_BASE_DOMAIN}/stock/${testSymbol}/quote`, (req, res, ctx) =>
        // return mock data
        res(ctx.json(mockQuote)),
    ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Favorite Stocks Search Component', () => {
    it('should render search component without any error', () => {
        render(<FavoriteStocksSearch />);
        expect(screen.getByTestId('favorite-stock-search')).toBeInTheDocument();
    });
    it('should search input have empty value by default', () => {
        render(<FavoriteStocksSearch />);
        const input = screen.getByTestId('favorite-stock-search-input');
        expect(input).toHaveValue('');
    });
    it('should display the type value in the input', () => {
        render(<FavoriteStocksSearch />);
        const input = screen.getByTestId('favorite-stock-search-input');
        fireEvent.change(input, { target: { value: 'A' } });
        expect(input).toHaveValue('A');
    });
    it('should trigger search after typing more than 2 letters and open dropdown', async () => {
        render(<FavoriteStocksSearch />);
        const input = screen.getByTestId('favorite-stock-search-input');
        fireEvent.change(input, { target: { value: testSymbol } }); // this will init fetch search
        expect(input).toHaveValue(testSymbol);
        setTimeout(() => {
            // sync to flow to wait until the fetch is completed and state gets updated
            expect(screen.getByText(mockQuote?.companyName)).toBeInTheDocument();
            expect(screen.getByTestId('dropdown-company-btn')).toBeInTheDocument();
        });
    });
});
