import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

import {
  LIST_PAGINATED_MY_NOTIFICATIONS_ENDPOINT,
  MARK_A_NOTIFICATION_AS_READ,
  MARK_ALL_NOTIFICATIONS_AS_READ,
  REMOVE_ALL_NOTIFICATIONS,
} from '../../constants/apiEndpointConstants';

// ----------------------------------------------------------------------

const initialState = {
  connection: null,
  isLoading: false,
  error: null,
  notifications: [],
  totalItems: 0,
  totalPages: 0,
  desc: true,
  page: 1,
  limit: 5,
  keyword: '',
  isDeleted: false,
  orderProperty: 'createdAt',
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
    // GET NOTIFICATIONS
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.notifications = action.payload.items;
      state.page = action.payload.currentPage;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
    },

    // ADD NOTIFICATION
    addNotificationSuccess(state, action) {
      state.isLoading = false;
      state.notifications = [action.payload, ...state.notifications];
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

export const { setPage, setLimit, setKeyword, setOrderDesc, setOrderProperty, setConnection, addNotificationSuccess } =
  slice.actions;

export function getNotifications(params) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(LIST_PAGINATED_MY_NOTIFICATIONS_ENDPOINT, {
        params,
      });
      dispatch(slice.actions.getNotificationsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function markNotificationAsRead(notificationId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(MARK_A_NOTIFICATION_AS_READ.replace('<<id>>', notificationId));
      dispatch(
        getNotifications({
          page: 1,
          limit: 5,
          keyword: '',
          orderProperty: 'createdAt',
          desc: true,
          isDeleted: false,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function markAllNotificationsAsRead() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(MARK_ALL_NOTIFICATIONS_AS_READ);
      dispatch(
        getNotifications({
          page: 1,
          limit: 5,
          keyword: '',
          orderProperty: 'createdAt',
          desc: true,
          isDeleted: false,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function removeAllNotifications() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(REMOVE_ALL_NOTIFICATIONS);
      dispatch(
        getNotifications({
          page: 1,
          limit: 5,
          keyword: '',
          orderProperty: 'createdAt',
          desc: true,
          isDeleted: false,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
