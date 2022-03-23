import React from 'react';
import { percentageFormatter } from '../../utils';
import Icons from '../Icons';
import './Style.scss';

type Prop = {
    changePercent: number;
};

const Percentage = ({ changePercent }: Prop) => {
    if (!changePercent) return null;
    const isUp = changePercent > 0;
    return (
        <div className={`percentage ${isUp ? 'is-up' : 'is-down'}`} data-testid="percentage">
            <span data-testid="percentage-text">{percentageFormatter(changePercent)}</span>
            <Icons name={isUp ? 'arrow-up' : 'arrow-down'} />
        </div>
    );
};

export default Percentage;
