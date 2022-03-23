import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../app/testWrapper';
import Percentage from './index';

describe('Percentage Common Component', () => {
    it('should render percentage component', () => {
        render(<Percentage changePercent={0.012} />);
        expect(screen.getByTestId('percentage')).toBeInTheDocument();
    });
    it('should format percentage properly based on the changed percentage', () => {
        render(<Percentage changePercent={0.012} />);
        expect(screen.getByTestId('percentage-text')).toHaveTextContent('1.20%');
    });
    describe('Change percentage is negative', () => {
        it('should display text as green', () => {
            render(<Percentage changePercent={0.012} />);
            expect(screen.getByTestId('percentage')).toHaveClass('is-up');
        });
        it('should display up icon', () => {
            render(<Percentage changePercent={0.012} />);
            expect(screen.getByTestId('icons')).toHaveClass('icons-arrow-up');
        });
    });
    describe('Change percentage is negative', () => {
        it('should display text as red', () => {
            render(<Percentage changePercent={-0.012} />);
            expect(screen.getByTestId('percentage')).toHaveClass('is-down');
        });
        it('should display down icon', () => {
            render(<Percentage changePercent={-0.012} />);
            expect(screen.getByTestId('icons')).toHaveClass('icons-arrow-down');
        });
    });
});
