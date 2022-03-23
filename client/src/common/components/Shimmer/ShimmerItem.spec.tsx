import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../app/testWrapper';
import Shimmer from './index';
import ShimmerItem from './ShimmerItem';

describe('Shimmer Common Component', () => {
    it('should render shimmer items component', () => {
        render(
            <Shimmer>
                <ShimmerItem />
            </Shimmer>,
        );
        expect(screen.getByTestId('shimmer-item')).toBeInTheDocument();
    });
    it('should reflect the className prop to shimmer items properly', () => {
        render(
            <Shimmer>
                <ShimmerItem className="some-class-name" />
            </Shimmer>,
        );
        expect(screen.getByTestId('shimmer-item')).toHaveClass('some-class-name');
    });
    it('should reflect the marginBottom prop to shimmer items properly', () => {
        render(
            <Shimmer>
                <ShimmerItem marginBottom={10} />
            </Shimmer>,
        );
        expect(screen.getByTestId('shimmer-item')).toHaveStyle('margin-bottom: 10px');
    });
    it('should reflect the height prop to shimmer items properly', () => {
        render(
            <Shimmer>
                <ShimmerItem height={20} />
            </Shimmer>,
        );
        expect(screen.getByTestId('shimmer-item')).toHaveStyle('height: 20px');
    });
    it('should reflect the width prop to shimmer items properly', () => {
        render(
            <Shimmer>
                <ShimmerItem width={200} />
            </Shimmer>,
        );
        expect(screen.getByTestId('shimmer-item')).toHaveStyle('width: 200px');
    });
});
