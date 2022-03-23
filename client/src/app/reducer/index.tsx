import userReducer from '../slices/userSlice';
import favoriteStocksReducer from '../../features/FavoriteStocks/FavoriteStocksSlice';
import searchReducer from '../../features/FavoriteStocks/Search/SearchSlice';

const rootReducer = {
    user: userReducer,
    favoriteStocks: favoriteStocksReducer,
    search: searchReducer,
};

export default rootReducer;
