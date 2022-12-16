import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

import { LIST_PAGINATED_MY_CAMERA_DETECT_RESULTS_ENDPOINT } from '../../constants/apiEndpointConstants';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  cameraDetectResults: [],
  totalItems: 0,
  totalPages: 0,
  desc: true,
  page: 1,
  limit: 100,
  keyword: '',
  orderProperty: 'createdAt',
};

const slice = createSlice({
  name: 'cameraDetectResults',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // GET LostVehicleRequest
    getCameraDetectResultsSuccess(state, action) {
      state.isLoading = false;
      state.cameraDetectResults = action.payload.items;
      state.page = action.payload.currentPage;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
    },

    // Paginate
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setOrderDesc(state, action) {
      state.desc = action.payload;
    },
    setOrderProperty(state, action) {
      state.orderProperty = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

export const { setPage, setLimit, setKeyword, setOrderDesc, setOrderProperty, setConnection } = slice.actions;

export function getCameraDetectResult(params) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(LIST_PAGINATED_MY_CAMERA_DETECT_RESULTS_ENDPOINT, {
        params,
      });
      dispatch(slice.actions.getCameraDetectResultsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
