import React from 'react';
import './Style.scss';

const EmptyState = () => {
    return (
        <div className="favorite-stocks-list-empty" data-testid="favorite-stocks-list-empty-state">
            <div className="ui-text-muted">
                <div>You don't have any stock in your favorite list.</div>
                <div>Please use the search box to add.</div>
            </div>
        </div>
    );
};

export default EmptyState;
