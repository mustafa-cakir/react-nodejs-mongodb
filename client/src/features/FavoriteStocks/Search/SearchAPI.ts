import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_STOCK_QUOTE_BY_SYMBOL } from '../../../common/constants/apis';
import FetchIEX from '../../../common/FetchIEX';
import { IError, IQuote } from '../../../app/types';

const fetchSearch = createAsyncThunk('search/quote', async (symbol: string, { rejectWithValue }) => {
    return FetchIEX(GET_STOCK_QUOTE_BY_SYMBOL.replace('{symbol}', symbol)).then(
        (result: IQuote) => result,
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // https://reactjs.org/docs/faq-ajax.html
        (error: IError) => rejectWithValue(error?.message || 'Opps there seems to be an error. Please try again.'),
    );
});

export default fetchSearch;
