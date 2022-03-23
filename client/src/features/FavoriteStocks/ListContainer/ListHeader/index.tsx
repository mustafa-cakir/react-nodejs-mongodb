import React from 'react';
import Icons from '../../../../common/components/Icons';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { setListingType } from '../../../../app/slices/userSlice';
import { IListingType } from '../../../../app/types';
import './Style.scss';

const FavoriteStocksListHeader = () => {
    const { listingType } = useAppSelector(redux => redux.user);
    const dispatch = useAppDispatch();

    const changeListingType = (type: IListingType) => {
        dispatch(setListingType(type));
    };
    return (
        <div className="favorite-stocks-list-header" data-testid="favorite-stocks-list-header">
            <h3>My Favorites</h3>
            <div className="sort-icon">
                <button
                    data-testid="list-type-table-btn"
                    type="button"
                    onClick={() => changeListingType('table')}
                    className={`ui-icon-button ${listingType === 'table' ? 'active' : ''}`}
                >
                    <Icons name="list" />
                </button>
                <div className="separator" />
                <button
                    data-testid="list-type-grid-btn"
                    type="button"
                    onClick={() => changeListingType('grid')}
                    className={`ui-icon-button ${listingType === 'grid' ? 'active' : ''}`}
                >
                    <Icons name="grid" />
                </button>
            </div>
        </div>
    );
};

export default FavoriteStocksListHeader;
