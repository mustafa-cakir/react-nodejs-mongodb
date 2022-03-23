import React, { FC, ReactElement } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { makeStore } from '../store';

const customRender = (
    ui: ReactElement,
    {
        // @ts-ignore
        preloadedState,
        store = makeStore(preloadedState),
        ...renderOptions
    } = {},
) => {
    const AllTheProviders: FC = ({ children }) => {
        return (
            <Provider store={store}>
                <BrowserRouter>{children}</BrowserRouter>
            </Provider>
        );
    };

    return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};

export * from '@testing-library/react';
export { customRender as render };
