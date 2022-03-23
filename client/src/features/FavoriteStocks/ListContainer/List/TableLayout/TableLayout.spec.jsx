import React from 'react';
import { render } from '../../../../../app/testWrapper';
import { fireEvent, screen, within } from '@testing-library/react';
import TableLayout from './index';
import { currenyFormatter, percentageFormatter } from '../../../../../common/utils';

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

describe('Table Layout Component', () => {
    const openCompanyDetailModalHandler = jest.fn();
    const removeStockHandler = jest.fn();
    const renderTableComponentWithMockData = () => {
        render(
            <TableLayout
                openCompanyDetailModalHandler={openCompanyDetailModalHandler}
                removeStockHandler={removeStockHandler}
            />,
            {
                preloadedState: {
                    favoriteStocks: {
                        quotes: mockQuotes,
                    },
                    user: {
                        listingType: 'table',
                    },
                },
            },
        );
    };
    it('should render stocks in table without any error', () => {
        renderTableComponentWithMockData();
        expect(screen.getByTestId('favorite-stocks-list-table')).toBeInTheDocument();
    });
    it('should display all available stocks', () => {
        renderTableComponentWithMockData();
        expect(screen.getAllByTestId('favorite-stocks-list-table-item').length).toBe(mockQuotes?.length);
    });
    it('should clicking remove button remove the stock', () => {
        renderTableComponentWithMockData();
        const items = screen.getAllByTestId('favorite-stocks-list-table-item');
        const firstItem = items?.[0];
        const removeBtn = within(firstItem).getByTestId('favorite-stocks-list-table-remove-btn');
        fireEvent.click(removeBtn);
        expect(removeStockHandler).toBeCalled();
        setTimeout(() => {
            // wait until redux updates the cate and cause re-render
            expect(screen.queryByText(mockQuotes?.[0].symbol)).not.toBeInTheDocument();
        });
    });
    it('should clicking detail button open company details modal', () => {
        renderTableComponentWithMockData();
        const items = screen.getAllByTestId('favorite-stocks-list-table-item');
        const firstItem = items?.[0];
        const detailsButton = within(firstItem).getByTestId('company-details-button');
        fireEvent.click(detailsButton);
        expect(openCompanyDetailModalHandler).toBeCalledTimes(1);
        setTimeout(() => {
            // wait until redux updates the cate and cause re-render
            expect(screen.getByTestId('ompany-details-modal')).toBeInTheDocument();
        });
    });
    it('should display company symbol, price, change properly in each row', () => {
        renderTableComponentWithMockData();
        // assert for the first quote's details
        const items = screen.getAllByTestId('favorite-stocks-list-table-item');
        const firstItem = items?.[0];

        expect(within(firstItem).getByText(mockQuotes?.[0]?.symbol)).toBeInTheDocument();
        expect(within(firstItem).getByText(mockQuotes?.[0]?.companyName)).toBeInTheDocument();
        expect(within(firstItem).getByTestId('favorite-stocks-list-table-percentage')).toHaveTextContent(
            percentageFormatter(mockQuotes?.[0]?.changePercent),
        );
        expect(within(firstItem).getByTestId('favorite-stocks-list-table-price')).toHaveTextContent(
            currenyFormatter(mockQuotes?.[0]?.latestPrice, mockQuotes?.[0]?.currency),
        );
    });
});
