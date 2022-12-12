import { useEffect, useState } from 'react';
// @mui

import { Container } from '@mui/material';
// react mapbox
import ReactMapGL from 'react-map-gl';
// redux
import { useDispatch, useSelector } from 'react-redux';

// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { getCameraDetectResult } from '../../redux/slices/cameraDetectResult';
import { MAPBOX_API, MAPBOX_STYLE } from '../../config';
import { AppMarkerList } from '../../sections/@dashboard/general/app';
// ----------------------------------------------------------------------

export default function GeneralApp() {
  const dispatch = useDispatch();
  const { page, limit, cameraDetectResults } = useSelector((state) => state.cameraDetectResult);
  const { themeStretch } = useSettings();

  const [viewport, setViewport] = useState({
    width: '70vw',
    height: '66vh',
    latitude: 14.0583,
    longitude: 108.2772,
    zoom: 4,
  });

  useEffect(() => {
    dispatch(
      getCameraDetectResult({
        page,
        limit,
      })
    );
  }, [dispatch]);

  console.log(MAPBOX_STYLE);

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', justifyContent: 'center' }}>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_API}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapStyle={MAPBOX_STYLE}
        >
          <AppMarkerList cameraDetectResults={cameraDetectResults} />
        </ReactMapGL>
      </Container>
    </Page>
  );
}
