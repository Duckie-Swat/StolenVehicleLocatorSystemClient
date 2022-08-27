import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  connection: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setConnection(state, action) {
      state.connection = action.payload;
    },
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setConnection } = slice.actions;
