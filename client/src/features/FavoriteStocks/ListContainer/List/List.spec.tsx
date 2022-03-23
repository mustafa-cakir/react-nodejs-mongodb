import { render } from '../../../../app/testWrapper';
import { screen } from '@testing-library/react';
import React from 'react';
import FavoriteStocksList from './index';

const mockQuotes = [
    {
        currency: 'USD',
        changePercent: 0.08344,
        latestPrice: 154.21,
        companyName: 'Apple Inc.',
        symbol: 'AAPL',
    },
    {
        currency: 'USD',
        changePercent: 0.01344,
        latestPrice: 2525.21,
        companyName: 'Alphabet Inc - Class A',
        symbol: 'GOOGL',
    },
    {
        currency: 'USD',
        changePercent: -0.07244,
        latestPrice: 33.21,
        companyName: 'Twitter Inc',
        symbol: 'TWTR',
    },
];

describe('Favorite Stocks List Component', () => {
    it('should render stock list component without any error', () => {
        render(<FavoriteStocksList />, {
            preloadedState: {
                favoriteStocks: {
                    quotes: mockQuotes,
                },
            },
        });
        expect(screen.getByTestId('favorite-stocks-list')).toBeInTheDocument();
    });
    it('should handle empty case', () => {
        render(<FavoriteStocksList />);
        expect(screen.getByText("You don't have any stock in your favorite list.")).toBeInTheDocument();
    });
    it('should handle error', () => {
        render(<FavoriteStocksList />, {
            preloadedState: {
                favoriteStocks: {
                    quotes: mockQuotes,
                    error: 'Some Error Message',
                },
            },
        });
        expect(screen.getByTestId('favorite-stocks-list-error')).toBeInTheDocument();
        expect(screen.getByTestId('favorite-stocks-list-error')).toHaveTextContent('Some Error Message');
    });
    it('should handle loading state', () => {
        render(<FavoriteStocksList />, {
            preloadedState: {
                favoriteStocks: {
                    quotes: [],
                    isLoading: true,
                },
            },
        });
        expect(screen.getByTestId('shimmer')).toBeInTheDocument();
    });
    it('should display stocks in table-layout if it is default users list type', () => {
        render(<FavoriteStocksList />, {
            preloadedState: {
                favoriteStocks: {
                    quotes: mockQuotes,
                },
                user: {
                    listingType: 'table',
                },
            },
        });
        expect(screen.getByTestId('favorite-stocks-list-table')).toBeInTheDocument();
    });
    it('should display stocks in grid-layout if it is default users list type', () => {
        render(<FavoriteStocksList />, {
            preloadedState: {
                favoriteStocks: {
                    quotes: mockQuotes,
                },
                user: {
                    listingType: 'grid',
                },
            },
        });
        expect(screen.getByTestId('favorite-stocks-list-grid')).toBeInTheDocument();
    });
});
