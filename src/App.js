import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as signalR from '@microsoft/signalr';
import { setConnection, addNotificationSuccess } from './redux/slices/notification';
import Router from './routes';

// hooks
import useAuth from './hooks/useAuth';

// theme
import ThemeProvider from './theme';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import ThemeColorPresets from './components/ThemeColorPresets';
import ThemeLocalization from './components/ThemeLocalization';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { connection: notificationConnection } = useSelector((state) => state.notification);

  useEffect(() => {
    if (isAuthenticated) {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${process.env.REACT_APP_HOST_API_KEY}/hubs/notifications`, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => localStorage.getItem('accessToken'),
          withCredentials: true,
        })
        .configureLogging(signalR.LogLevel.Debug)
        .withHubProtocol(new signalR.JsonHubProtocol())
        .withAutomaticReconnect()
        .build();
      connection
        .start()
        .then(() => {
          dispatch(setConnection(connection));
        })
        .catch((error) => {
          console.log('Connection error', error);
        });
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    // handle recv message from signalR server
    const handleNotification = (message) => {
      console.log(message);
      dispatch(addNotificationSuccess(message));
    };
    notificationConnection?.on('SendNotification', handleNotification);

    return () => {
      notificationConnection?.off('SendNotification', notificationConnection);
    };
  }, [notificationConnection]);

  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <ThemeLocalization>
          <RtlLayout>
            <NotistackProvider>
              <MotionLazyContainer>
                <ProgressBarStyle />
                <ChartStyle />
                <Settings />
                <ScrollToTop />
                <Router />
              </MotionLazyContainer>
            </NotistackProvider>
          </RtlLayout>
        </ThemeLocalization>
      </ThemeColorPresets>
    </ThemeProvider>
  );
}
