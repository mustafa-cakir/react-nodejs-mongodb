import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../app/testWrapper';
import Alert from './index';

describe('Alert Common Component', () => {
    it('should render alert component', () => {
        render(<Alert type="error" message="some message" />);
        expect(screen.getByTestId('alert')).toBeInTheDocument();
    });
    it('should alert component display message prop', () => {
        render(<Alert type="error" message="some message" />);
        expect(screen.getByTestId('alert-message')).toHaveTextContent('some message');
    });
    it('should alert component type set to error', () => {
        render(<Alert type="error" message="some message" />);
        expect(screen.getByTestId('alert')).toHaveClass('type-error');
    });
    it('should alert component type set to info', () => {
        render(<Alert type="info" message="some message" />);
        expect(screen.getByTestId('alert')).toHaveClass('type-info');
    });
    it('should alert component type set to success', () => {
        render(<Alert type="success" message="some message" />);
        expect(screen.getByTestId('alert')).toHaveClass('type-success');
    });
    it('should alert component type set to warning', () => {
        render(<Alert type="warning" message="some message" />);
        expect(screen.getByTestId('alert')).toHaveClass('type-warning');
    });
});
