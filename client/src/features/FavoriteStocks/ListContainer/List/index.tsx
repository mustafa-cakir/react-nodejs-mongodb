import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import Alert from '../../../../common/components/Alert';
import TableLayout from './TableLayout';
import GridLayout from './GridLayout';
import ShimmerLoading from './ShimmerLoading';
import EmptyState from './EmptyState';
import { removeItemFromQuotes } from '../../FavoriteStocksSlice';
import { removeItemFromFavStocks } from '../../../../app/slices/userSlice';
import Modal from '../../../../common/components/Modal';
import CompanyDetails from '../../CompanyDetails';

const FavoriteStocksList = () => {
    const [openCompanyDetailBySymbol, setOpenCompanyDetailBySymbol] = useState('');
    const dispatch = useAppDispatch();
    const { listingType } = useAppSelector(redux => redux.user);
    const { error, isLoading, quotes } = useAppSelector(redux => redux.favoriteStocks);

    const removeStockHandler = (favStock: string) => {
        dispatch(removeItemFromQuotes(favStock));
        dispatch(removeItemFromFavStocks(favStock));
    };

    const openCompanyDetailModalHandler = (symbol: string) => {
        setOpenCompanyDetailBySymbol(openCompanyDetailBySymbol === symbol ? '' : symbol); // toggle or set
    };

    const closeCompanyDetailModalHandler = () => {
        setOpenCompanyDetailBySymbol('');
    };

    if (isLoading) return <ShimmerLoading />;
    if (quotes?.length === 0) return <EmptyState />;

    return (
        <div data-testid="favorite-stocks-list">
            {openCompanyDetailBySymbol && (
                <Modal closeHandler={closeCompanyDetailModalHandler}>
                    <CompanyDetails symbol={openCompanyDetailBySymbol} />
                </Modal>
            )}
            {error && (
                <div className="ui-mb-15" data-testid="favorite-stocks-list-error">
                    <Alert type="error" message={error} />
                </div>
            )}
            {listingType === 'table' && (
                <TableLayout
                    removeStockHandler={removeStockHandler}
                    openCompanyDetailModalHandler={openCompanyDetailModalHandler}
                />
            )}
            {listingType === 'grid' && (
                <GridLayout
                    removeStockHandler={removeStockHandler}
                    openCompanyDetailModalHandler={openCompanyDetailModalHandler}
                />
            )}
        </div>
    );
};

export default FavoriteStocksList;
