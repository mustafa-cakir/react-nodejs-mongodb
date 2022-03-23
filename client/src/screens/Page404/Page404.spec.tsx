import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../app/testWrapper';
import Page404 from './index';

describe('Page 404 Screen', () => {
    it('should render page 404 screen without any error', () => {
        render(<Page404 />);
        expect(screen.getByTestId('page-404')).toBeInTheDocument();
    });
    it('should display the page not found error message', () => {
        render(<Page404 />);
        expect(screen.getByText('404 - Page not found.')).toBeInTheDocument();
    });
});
