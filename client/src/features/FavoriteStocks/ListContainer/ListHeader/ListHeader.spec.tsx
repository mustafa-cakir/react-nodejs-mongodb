import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../../../app/testWrapper';
import FavoriteStocksListHeader from './index';

describe('Favorite Stocks List Header Component', () => {
    it('should render header component without any error', () => {
        render(<FavoriteStocksListHeader />);
        expect(screen.getByTestId('favorite-stocks-list-header')).toBeInTheDocument();
    });
    it('should render the title', () => {
        render(<FavoriteStocksListHeader />);
        expect(screen.getByText('My Favorites')).toBeInTheDocument();
    });
    it('should render the listing type toggle buttons', () => {
        render(<FavoriteStocksListHeader />);
        expect(screen.getByTestId('list-type-table-btn')).toBeInTheDocument();
        expect(screen.getByTestId('list-type-grid-btn')).toBeInTheDocument();
    });
    it('should table list type button is activated by default', () => {
        render(<FavoriteStocksListHeader />, {
            preloadedState: {
                user: {
                    listingType: 'table',
                },
            },
        });
        expect(screen.getByTestId('list-type-table-btn')).toHaveClass('active');
    });
    it('should clicking the inactive button switch the global listing type', () => {
        render(<FavoriteStocksListHeader />, {
            preloadedState: {
                user: {
                    listingType: 'table',
                },
            },
        });
        const gridBtn = screen.getByTestId('list-type-grid-btn');
        fireEvent.click(gridBtn);
        expect(screen.getByTestId('list-type-grid-btn')).toHaveClass('active');
        expect(screen.getByTestId('list-type-table-btn')).not.toHaveClass('active');
    });
});
