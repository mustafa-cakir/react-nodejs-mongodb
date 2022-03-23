import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../app/testWrapper';
import UIKit from './index';

describe('UIKit Screen', () => {
    it('should render uikit screen without any error', () => {
        render(<UIKit />);
        expect(screen.getByTestId('ui-kit')).toBeInTheDocument();
    });
});
