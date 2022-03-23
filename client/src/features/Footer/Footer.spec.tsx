import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../app/testWrapper';
import Footer from './index';

describe('Footer Component', () => {
    it('should render footer component without any error', () => {
        render(<Footer />);
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
});
