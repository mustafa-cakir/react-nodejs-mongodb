import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../app/testWrapper';
import Icons from './index';

describe('Icons Common Component', () => {
    it('should render icons component', () => {
        render(<Icons name="info" />);
        expect(screen.getByTestId('icons')).toBeInTheDocument();
    });
    it('should icon component display icons', () => {
        render(<Icons name="info" />);
        expect(screen.getByTestId('icons')).toHaveClass('icons-info');
    });
});
