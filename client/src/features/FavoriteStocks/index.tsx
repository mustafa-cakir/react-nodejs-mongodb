import React from 'react';
import FavoriteStocksSearch from './Search';
import ListContainer from './ListContainer';
import './Style.scss';

const FavoriteStocks = () => {
    return (
        <div className="favorite-stocks">
            <FavoriteStocksSearch />
            <ListContainer />
        </div>
    );
};

export default FavoriteStocks;
