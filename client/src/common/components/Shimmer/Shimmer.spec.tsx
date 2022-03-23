import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../app/testWrapper';
import Shimmer from './index';

describe('Shimmer Common Component', () => {
    it('should render shimmer component', () => {
        render(
            <Shimmer>
                <div>inner body</div>
            </Shimmer>,
        );
        expect(screen.getByTestId('shimmer')).toBeInTheDocument();
    });
});
