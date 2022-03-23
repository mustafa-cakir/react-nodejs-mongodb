import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../../app/testWrapper';
import Modal from './index';

describe('Modal Common Component', () => {
    it('should render modal component', () => {
        const closeHandler = jest.fn();
        render(
            <Modal closeHandler={closeHandler}>
                <div>Modal Body Goes Here</div>
            </Modal>,
        );
        expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
    it('should modal component display content inside the modal', () => {
        const closeHandler = jest.fn();
        render(
            <Modal closeHandler={closeHandler}>
                <div>Modal Body Goes Here</div>
            </Modal>,
        );
        expect(screen.getByText('Modal Body Goes Here')).toBeInTheDocument();
    });
    it('should modal component refrelect max-width prop', () => {
        const closeHandler = jest.fn();
        render(
            <Modal closeHandler={closeHandler} maxWidth={600}>
                <div>Modal Body Goes Here</div>
            </Modal>,
        );
        expect(screen.getByTestId('modal-dialog')).toHaveStyle('max-width: 600px');
    });
    it('should modal component reflects title prop', () => {
        const closeHandler = jest.fn();
        render(
            <Modal closeHandler={closeHandler} title="Some Title Here">
                <div>Modal Body Goes Here</div>
            </Modal>,
        );
        expect(screen.getByText('Some Title Here')).toBeInTheDocument();
    });
    it('should trigger closeHandler upon clicking the close button', () => {
        const closeHandler = jest.fn();
        render(
            <Modal closeHandler={closeHandler}>
                <div>Modal Body Goes Here</div>
            </Modal>,
        );
        const closeButton = screen.getByTestId('modal-close-btn');
        fireEvent.click(closeButton);
        expect(closeHandler).toHaveBeenCalled();
    });
});
