import React, { useEffect } from 'react';
import FavoriteStocks from '../../features/FavoriteStocks';

const Homepage = () => {
    useEffect(() => {
        document.title = 'Favorite Stocks';
    }, []);

    return (
        <div className="container ui-min-h-500" data-testid="homepage">
            <FavoriteStocks />
        </div>
    );
};

export default Homepage;
