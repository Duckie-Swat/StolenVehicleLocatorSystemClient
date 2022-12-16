import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import notificationReducer from './slices/notification';
import cameraReducer from './slices/camera';
import lostVehicleRequestReducer from './slices/lostVehicleRequest';
import cameraDetectResultReducer from './slices/cameraDetectResult';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  notification: notificationReducer,
  camera: cameraReducer,
  lostVehicleRequest: lostVehicleRequestReducer,
  cameraDetectResult: cameraDetectResultReducer,
});

export { rootPersistConfig, rootReducer };
