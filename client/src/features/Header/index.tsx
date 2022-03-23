import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import ThemeSwitcher from '../../common/components/ThemeSwitcher';
import { URL_HOMEPAGE } from '../../common/constants';
import './Style.scss';
import MenuItems from '../../common/components/MenuItems';

const Header = () => {
    return (
        <header className="header" data-testid="header">
            <div className="header-bg" />
            <div className="header-bg-curve" />
            <div className="header-content">
                <div className="container">
                    <div className="header-inner">
                        <div className="header-inner-left">
                            <Link to={URL_HOMEPAGE}>
                                <img src={logo} className="header-logo" alt="logo" data-testid="header-logo" />
                            </Link>
                            <div className="header-separator" />
                            <h2 className="header-slogan" data-testid="header-slogan">
                                Stocks
                            </h2>
                        </div>
                        <div className="header-inner-right">
                            <ThemeSwitcher />
                        </div>
                    </div>
                    <div className="header-menu-items">
                        <MenuItems />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
