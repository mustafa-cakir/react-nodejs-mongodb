import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../app/testWrapper';
import Header from './index';

describe('Header Component', () => {
    it('should render header component without any error', () => {
        render(<Header />);
        expect(screen.getByTestId('header')).toBeInTheDocument();
    });
    it('should display slogan in the header', () => {
        render(<Header />);
        expect(screen.getByTestId('header-slogan')).toHaveTextContent('Stocks');
    });
    it('should display logo in the header', () => {
        render(<Header />);
        expect(screen.getByTestId('header-logo')).toBeInTheDocument();
    });
    it('should render themeSwitcher component', () => {
        render(<Header />);
        expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
    });
    it('should render menuItems component', () => {
        render(<Header />);
        expect(screen.getByTestId('menu-items')).toBeInTheDocument();
    });
});
