import React from 'react';
import { render } from '../../../app/testWrapper';
import CompanyDetails from './index';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { IEX_BASE_DOMAIN } from '../../../common/constants/apis';
import { screen, waitFor } from '@testing-library/react';

const mockSymbol = 'APPL';

const mockCompany = {
    symbol: 'AAPL',
    companyName: 'Apple Inc',
    exchange: 'NASDAQ',
    industry: 'Electronic Computer Manufacturing ',
    website: 'https://www.apple.com/',
    description:
        "Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services. It is considered one of the Big Five companies in the U.S. information technology industry, along with Amazon, Google, Microsoft, and Facebook. Its hardware products include the iPhone smartphone, the iPad tablet computer, the Mac personal computer, the iPod portable media player, the Apple Watch smartwatch, the Apple TV digital media player, the AirPods wireless earbuds, the AirPods Max headphones, and the HomePod smart speaker line. Apple's software includes iOS, iPadOS, macOS, watchOS, and tvOS operating systems, the iTunes media player, the Safari web browser, the Shazam music identifier, and the iLife and iWork creativity and productivity suites, as well as professional applications like Final Cut Pro X, Logic Pro, and Xcode. Its online services include the iTunes Store, the iOS App Store, Mac App Store, Apple Arcade, Apple Music, Apple TV+, iMessage, and iCloud. Other services include Apple Store, Genius Bar, AppleCare, Apple Pay, Apple Pay Cash, and Apple Card. Apple was founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in April 1976 to develop and sell Wozniak's Apple I personal computer, though Wayne sold his share back within 12 days. It was incorporated as Apple Computer, Inc., in January 1977, and sales of its computers, including the Apple I and Apple II, grew quickly.",
    CEO: 'Timothy Cook',
    securityName: 'Apple Inc',
    issueType: 'cs',
    sector: 'Manufacturing',
    primarySicCode: 3571,
    employees: 147000,
    tags: [
        'Electronic Technology',
        'Telecommunications Equipment',
        'Manufacturing',
        'Electronic Computer Manufacturing ',
    ],
    address: '1 Apple Park Way',
    address2: null,
    state: 'California',
    city: 'Cupertino',
    zip: '95014-0642',
    country: 'United States',
    phone: '14089961010',
};

const server = setupServer(
    rest.get(`${IEX_BASE_DOMAIN}/stock/${mockSymbol}/company`, (req, res, ctx) =>
        // return mock data
        res(ctx.json(mockCompany)),
    ),
);

describe('Company Details Component', () => {
    it('should display without any error and display all company details', () => {
        render(<CompanyDetails symbol={mockSymbol} />);
        expect(screen.getByTestId('shimmer')).toBeInTheDocument();
        waitFor(() => screen.getByText(mockCompany.companyName)).then(() => {
            expect(screen.getByText(mockCompany.companyName)).toBeInTheDocument();
            expect(screen.getByText(mockCompany.description)).toBeInTheDocument();
            expect(screen.getByText(mockCompany.symbol)).toBeInTheDocument();
            expect(screen.getByText(mockCompany.description)).toBeInTheDocument();
        });
    });
    it('should display error message if nothing is found', async () => {
        // error message that presumed to be returned from server
        const mockErrorMessage = 'sample error message goes here';
        const mockNotExistSymbol = 'AAAPPPLLL';
        // overwrite mock data and simulate the server error
        server.use(
            rest.get(`${IEX_BASE_DOMAIN}/stock/${mockNotExistSymbol}/company`, (req, res, ctx) =>
                res(
                    // Send a valid HTTP status code
                    ctx.status(403),
                    // And a response body, if necessary
                    ctx.json(mockErrorMessage),
                ),
            ),
        );
        render(<CompanyDetails symbol={mockNotExistSymbol} />);
        waitFor(() => screen.getByText(mockErrorMessage)).then(() => {
            expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
        });
    });
    it('should display empty state if nothing is found', () => {
        // error message that presumed to be returned from server
        const mockEmptyCompany = 'XXXX';
        // overwrite mock data and simulate the server error
        server.use(
            rest.get(`${IEX_BASE_DOMAIN}/stock/${mockEmptyCompany}/company`, (req, res, ctx) => res(ctx.json(null))),
        );

        render(<CompanyDetails symbol={mockEmptyCompany} />);
        waitFor(() => screen.getByText('Company details are not found.')).then(() => {
            expect(screen.getByText('Company details are not found.')).toBeInTheDocument();
        });
    });
});
