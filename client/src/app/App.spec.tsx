import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

describe('App', () => {
    it('should render app without any error', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>,
        );
        expect(screen.getByTestId('app')).toBeInTheDocument();
    });
});
