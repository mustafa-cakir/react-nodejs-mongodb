import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../../app/testWrapper';
import ThemeSwitcher from './index';

describe('ThemeSwitcher Common Component', () => {
    it('should render percentage component', () => {
        render(<ThemeSwitcher />);
        expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
    });

    it('should not be checked if theme is light (from the redux store)', () => {
        render(<ThemeSwitcher />, {
            preloadedState: {
                user: {
                    theme: 'light',
                },
            },
        });
        expect(screen.getByTestId('theme-switcher-input')).not.toBeChecked();
    });
    it('should be checked if theme is dark (from the redux store)', () => {
        render(<ThemeSwitcher />, {
            preloadedState: {
                user: {
                    theme: 'dark',
                },
            },
        });
        expect(screen.getByTestId('theme-switcher-input')).toBeChecked();
    });
    it('should toggle the theme upon clicking', () => {
        render(<ThemeSwitcher />, {
            preloadedState: {
                user: {
                    theme: 'dark',
                },
            },
        });
        expect(screen.getByTestId('theme-switcher-input')).toBeChecked();
        const btn = screen.getByTestId('theme-switcher');
        fireEvent.click(btn);
        expect(screen.getByTestId('theme-switcher-input')).not.toBeChecked();
    });
});
