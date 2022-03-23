import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IQuote, ISearch } from '../../../app/types';
import fetchSearch from './SearchAPI';

const initialState: ISearch = {
    quote: null,
    isLoading: false,
    error: null,
};

export const searchSlice = createSlice({
    name: 'counter',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // nothing for now...
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: builder => {
        builder
            .addCase(fetchSearch.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSearch.fulfilled, (state, action: PayloadAction<IQuote>) => {
                state.quote = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchSearch.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

const { reducer: searchReducer } = searchSlice;

export default searchReducer;