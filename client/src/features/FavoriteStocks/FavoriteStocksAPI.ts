import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_STOCK_QUOTE_BY_SYMBOL } from '../../common/constants/apis';
import { getUserStateFromLocalStorage } from '../../common/utils';
import { AppThunk } from '../../app/store';
import FetchIEX from '../../common/FetchIEX';
import { IError, IQuote } from '../../app/types';

// The function below is called a thunk and alloasdws us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchQuote = createAsyncThunk('stock/quote', async (symbol: string, { rejectWithValue }) => {
    return FetchIEX(GET_STOCK_QUOTE_BY_SYMBOL.replace('{symbol}', symbol)).then(
        (result: IQuote) => result,
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // https://reactjs.org/docs/faq-ajax.html
        (error: IError) => rejectWithValue(error?.message || 'Opps there seems to be an error. Please try again.'),
    );
});

export const fetchQuotesOnInit = (): AppThunk => dispatch => {
    const prevUserState = getUserStateFromLocalStorage();
    const { favStocks } = prevUserState || {};
    if (favStocks && favStocks.length > 0) {
        favStocks.map(symbol => dispatch(fetchQuote(symbol)));
    }
};
