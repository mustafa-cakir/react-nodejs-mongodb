import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import Alert from '../../../../common/components/Alert';
import { addItemToFavStocks } from '../../../../app/slices/userSlice';
import Icons from '../../../../common/components/Icons';
import ShimmerLoading from './ShimmerLoading';
import fetchSearch from '../SearchAPI';
import { IQuote } from '../../../../app/types';
import { addItemToQuotes } from '../../FavoriteStocksSlice';
import './Style.scss';

type Props = {
    keyword: string;
    addStockToFavCallback: () => void;
};

const FavoriteStocksSearchDropdown = ({ keyword, addStockToFavCallback }: Props) => {
    const dispatch = useAppDispatch();
    const { quote, isLoading, error } = useAppSelector(redux => redux.search);
    const { favStocks } = useAppSelector(redux => redux.user);

    useEffect(() => {
        if (keyword) {
            void dispatch(fetchSearch(keyword));
        }
    }, [dispatch, keyword]);

    const addStockToFavHandler = (payload: IQuote) => {
        dispatch(addItemToQuotes(payload));
        dispatch(addItemToFavStocks(payload.symbol));
        addStockToFavCallback();
    };

    if (error) {
        return (
            <div className="error-contaıner" data-testid="dropdown-error">
                <Alert type="error" message={error} />
            </div>
        );
    }

    if (isLoading) return <ShimmerLoading />;

    if (quote?.symbol) {
        return (
            <button
                type="button"
                className="company-btn"
                onClick={() => addStockToFavHandler(quote)}
                data-testid="dropdown-company-btn"
            >
                <div className="symbol" data-testid="dropdown-company-symbol">
                    {quote.symbol}
                </div>
                {quote.companyName && <div className="separator" />}
                <div className="ui-text-muted company" data-testid="dropdown-company-name">
                    {quote.companyName}
                </div>
                <div className="fav-icon">
                    <Icons name={favStocks.indexOf(quote.symbol) > -1 ? 'check-circle' : 'plus-circle'} />
                </div>
            </button>
        );
    }

    return (
        <div className="alert-contaıner" data-testid="dropdown-nothing-found">
            <Alert type="info" message="No result found." />
        </div>
    );
};

export default FavoriteStocksSearchDropdown;
