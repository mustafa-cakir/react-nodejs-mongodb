import React from 'react';
import { render } from '../../../../../app/testWrapper';
import EmptyState from './index';
import { screen } from '@testing-library/react';

describe('Empty State Contianer Component', () => {
    it('should render empty state component without any error', () => {
        render(<EmptyState />);
        expect(screen.getByTestId('favorite-stocks-list-empty-state')).toBeInTheDocument();
    });
});
