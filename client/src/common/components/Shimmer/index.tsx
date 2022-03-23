import React from 'react';
import './Style.scss';

const ShimmerContainer = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return (
        <div className="shimmer" data-testid="shimmer">
            {children}
        </div>
    );
};

export default ShimmerContainer;
