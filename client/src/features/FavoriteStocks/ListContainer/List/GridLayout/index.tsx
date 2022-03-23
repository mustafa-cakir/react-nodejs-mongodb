import React from 'react';
import { IQuote } from '../../../../../app/types';
import { currenyFormatter } from '../../../../../common/utils';
import Percentage from '../../../../../common/components/Percentage';
import Icons from '../../../../../common/components/Icons';
import { useAppSelector } from '../../../../../common/hooks';
import './Style.scss';

type Prop = {
    removeStockHandler: (favStock: string) => void;
    openCompanyDetailModalHandler: (symbol: string) => void;
};

const GridLayout = ({ removeStockHandler, openCompanyDetailModalHandler }: Prop) => {
    const { quotes } = useAppSelector(redux => redux.favoriteStocks);

    return (
        <div className="favorite-stocks-list-grid" data-testid="favorite-stocks-list-grid">
            <div className="grid-row">
                {quotes?.map((quote: IQuote) => {
                    const { symbol, companyName, latestPrice, currency, changePercent } = quote || {};
                    return (
                        <div className="grid-col col-box" key={symbol} data-testid="favorite-stocks-list-grid-item">
                            <div className="ui-box">
                                <div className="favorite-stocks-list-grid-inner">
                                    <div className="symbol">{symbol}</div>
                                    <div className="ui-text-muted company">{companyName}</div>
                                    <div>
                                        <button
                                            onClick={() => openCompanyDetailModalHandler(symbol)}
                                            className="ui-read-more-btn ui-mt-5"
                                            type="button"
                                            data-testid="company-details-button"
                                        >
                                            Details <Icons name="chevron-right" />
                                        </button>
                                    </div>
                                    <hr />
                                    <div className="latest-price" data-testid="favorite-stocks-list-grid-price">
                                        {currenyFormatter(latestPrice, currency)}
                                    </div>
                                    <div data-testid="favorite-stocks-list-grid-percentage">
                                        <span className="ui-text-muted">Change:</span>{' '}
                                        <Percentage changePercent={changePercent} />
                                    </div>
                                    <button
                                        data-testid="favorite-stocks-list-grid-remove-btn"
                                        type="button"
                                        className="ui-icon-button remove-btn"
                                        onClick={() => removeStockHandler(symbol)}
                                    >
                                        <Icons name="x" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GridLayout;
