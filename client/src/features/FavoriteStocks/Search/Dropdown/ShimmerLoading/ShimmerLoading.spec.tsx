import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../../../app/testWrapper';
import ShimmerLoading from './index';

describe('Dropdown Shimmer Component', () => {
    it('should render shimmer loading component without any error', () => {
        render(<ShimmerLoading />);
        expect(screen.getByTestId('dropdown-shimmer')).toBeInTheDocument();
    });
});
