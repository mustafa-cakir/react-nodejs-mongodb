import React, { useEffect } from 'react';
import Login from '../../features/Login';

const Homepage = () => {
    useEffect(() => {
        document.title = 'Favorite Stocks';
    }, []);

    return (
        <div className="container ui-min-h-500" data-testid="homepage">
            <Login />
        </div>
    );
};

export default Homepage;
