import React from 'react';
import FavoriteStocksList from './List';
import FavoriteStocksListHeader from './ListHeader';

const ListContainer = () => {
    return (
        <div className="favorite-stock-list-container" data-testid="favorite-stock-list-container">
            <FavoriteStocksListHeader />
            <FavoriteStocksList />
        </div>
    );
};

export default ListContainer;
