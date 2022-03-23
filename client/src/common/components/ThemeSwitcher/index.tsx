import React from 'react';
import { toggleTheme } from '../../../app/slices/userSlice';
import './Style.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';

const ThemeSwitcher = () => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(redux => redux.user);

    const toggleHandler = () => {
        dispatch(toggleTheme());
    };

    return (
        <label className="theme-switcher" data-testid="theme-switcher">
            <div className="theme-switcher-icon">
                <input
                    type="checkbox"
                    onChange={toggleHandler}
                    id="theme-switcher"
                    checked={theme === 'dark'}
                    data-testid="theme-switcher-input"
                />
                <span className="pin" />
            </div>
            <div className="theme-switcher-text">Dark Mode</div>
        </label>
    );
};

export default ThemeSwitcher;
