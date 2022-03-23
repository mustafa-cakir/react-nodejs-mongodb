import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../app/testWrapper';
import MenuItems from './index';

describe('MenuItems Common Component', () => {
    it('should render menu items component', () => {
        render(<MenuItems />);
        expect(screen.getByTestId('menu-items')).toBeInTheDocument();
    });
    it('should menu items component display items', () => {
        render(<MenuItems />);
        expect(screen.getByText(/UI-Kit Page/)).toBeInTheDocument();
        expect(screen.getByText(/Homepage/)).toBeInTheDocument();
        expect(screen.getByText(/404 Page/)).toBeInTheDocument();
    });
});
