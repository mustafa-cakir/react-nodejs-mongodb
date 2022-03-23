import React from 'react';

type Prop = {
    width?: undefined | number | string;
    height?: undefined | number | string;
    marginBottom?: undefined | number;
    className?: undefined | string;
};

const ShimmerItem = ({ height, width, marginBottom, className }: Prop) => {
    return (
        <div
            className={`shimmer-item ${className || ''}`}
            style={{ width, height, marginBottom }}
            data-testid="shimmer-item"
        />
    );
};

ShimmerItem.defaultProps = {
    width: undefined,
    height: undefined,
    marginBottom: undefined,
    className: null,
};

export default ShimmerItem;
