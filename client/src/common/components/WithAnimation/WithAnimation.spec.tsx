import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../app/testWrapper';
import WithAnimaation from './index';

describe('WithAnimation Common Component', () => {
    it('should render component without any error', () => {
        render(<WithAnimaation isShow />);
        expect(screen.getByTestId('with-animation')).toBeInTheDocument();
    });
    it('should hide itself if isShow is false', () => {
        render(<WithAnimaation isShow={false} />);
        expect(screen.queryByTestId('with-animation')).not.toBeInTheDocument();
    });
    it('should display children as its content', () => {
        render(
            <WithAnimaation isShow>
                <div>some text</div>
            </WithAnimaation>,
        );
        expect(screen.getByText('some text')).toBeInTheDocument();
    });
});
