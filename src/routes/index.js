import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },

        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserAccount /> },
          ],
        },
        {
          path: 'camera',
          children: [
            { element: <Navigate to="/dashboard/camera/list" replace />, index: true },
            { path: 'list', element: <CameraList /> },
            { path: 'new', element: <CameraCreate /> },
            { path: ':name/edit', element: <CameraCreate /> },
          ],
        },
        {
          path: 'my-lost-vehicles',
          children: [
            { element: <Navigate to="/dashboard/my-lost-vehicles/list" replace />, index: true },
            { path: 'list', element: <LostVehicleRequestList /> },
            { path: 'new', element: <CreateLostVehicleRequest /> },
            { path: ':name/edit', element: <CreateLostVehicleRequest /> },
          ],
        },
        {
          path: 'my-reports',
          children: [{ element: <Navigate to="/coming-soon" replace />, index: true }],
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// DASHBOARD

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));

// BLOG

const CameraList = Loadable(lazy(() => import('../pages/dashboard/CameraList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const CameraCreate = Loadable(lazy(() => import('../pages/dashboard/CameraCreate')));

// MAIN

const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

// LOST VEHICLE REQUEST
const CreateLostVehicleRequest = Loadable(lazy(() => import('../pages/dashboard/MyLostVehicleRequestCreate')));
const LostVehicleRequestList = Loadable(lazy(() => import('../pages/dashboard/MyLostVehicleRequestList')));
