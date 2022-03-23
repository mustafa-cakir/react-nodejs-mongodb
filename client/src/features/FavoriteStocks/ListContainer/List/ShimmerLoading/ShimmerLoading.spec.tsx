import React from 'react';
import { render } from '../../../../../app/testWrapper';
import ShimmerLoading from './index';

describe('List Shimmer Component', () => {
    it('should render shimmer loading component without any error', () => {
        render(<ShimmerLoading />);
    });
});
