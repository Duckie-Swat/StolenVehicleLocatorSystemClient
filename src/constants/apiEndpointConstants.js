// Auth
export const LOGIN_ENDPOINT = '/api/v1/auth/login';
export const REGISTER_ENDPOINT = '/api/v1/auth/register';
export const MY_PROFILE_ENDPOINT = '/api/v1/users/my-account';
export const CHANGE_PASSWORD_ENDPOINT = '/api/v1/auth/my-account/password';
export const LOGOUT_ENDPOINT = '/api/v1/auth/my-account/logout';
export const FORGOT_PASSWORD_ENDPOINT = '/api/v1/auth/reset-password';

// Camera
export const LIST_PAGINATED_MY_CAMERAS_ENDPOINT = '/api/v1/users/my-account/cameras/find';
export const CAMERA_ENDPOINT = '/api/v1/cameras';

// Notification
export const LIST_PAGINATED_MY_NOTIFICATIONS_ENDPOINT = '/api/v1/users/my-account/notifications/find';
export const MARK_A_NOTIFICATION_AS_READ = `/api/v1/users/my-account/notifications/<<id>>/mask`;
export const MARK_ALL_NOTIFICATIONS_AS_READ = '/api/v1/users/my-account/notifications/mask';
export const REMOVE_ALL_NOTIFICATIONS = '/api/v1/users/my-account/notifications/soft';

// LostVehicleRequest
export const LIST_PAGINATED_MY_LOST_VEHICLE_REQUESTS_ENDPOINT = '/api/v1/users/my-account/lost-vehicle-requests/find';
export const LOST_VEHICLE_REQUEST_ENDPOINT = '/api/v1/lost-vehicle-requests';

// CameraDetectResult
export const LIST_PAGINATED_MY_CAMERA_DETECT_RESULTS_ENDPOINT = '/api/v1/users/my-account/camera-detected-results/find';
