import {useEffect, useState} from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack } from '@mui/material';
// react mapbox
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
import {MAPBOX_API} from '../../config';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();

  const [viewport, setViewport] = useState({
    width: "70vw",
    height: "66vh",
    latitude: 10.82302,
    longitude: 106.62965,
    zoom: 14,
  });

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{display: 'flex', justifyContent: 'center',}}>
        {/* <Grid container spacing={3}> */}
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={MAPBOX_API}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapStyle="mapbox://styles/tonyb0301/cl7kosoop000514noo0nl4uit"
          >
            <Marker
              latitude={10.82302}
              longitude={106.62965}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <Room style={{ frontsize: viewport.zoom, color: "red" }} />
            </Marker>
            <Popup
              latitude={10.82302}
              longitude={106.62965}
              // closeButton={true}
              // closeOnClick={false}
              anchor="left"
            >
              <div className="card">
                <Label>Place</Label>
                <h4 className="place">Ho Chi Minh City</h4>
                <Label>Review</Label>
                <p className="desc">This is a nice place</p>
                <Label>Rating</Label>
                <div className="stars">
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                </div>
                <Label>Information</Label>
                <span className="username">
                  Created by <b>Tony</b>
                </span>
                <span className="date">1 hour ago</span>
              </div>
            </Popup>
          </ReactMapGL>
        {/* </Grid> */}
      </Container>
    </Page>
  );
}
