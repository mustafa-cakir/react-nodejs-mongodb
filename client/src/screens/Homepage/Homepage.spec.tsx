import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../app/testWrapper';
import Homepage from './index';

describe('Homepage Screen', () => {
    it('should render homepage screen without any error', () => {
        render(<Homepage />);
        expect(screen.getByTestId('homepage')).toBeInTheDocument();
    });
});
