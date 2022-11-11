import { Marker, Popup } from 'react-map-gl';
import React, { memo } from 'react';
import { Room } from '@material-ui/icons';
import { fDateTimeSuffix } from '../../../../utils/formatTime';
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';

const AppMarkerList = ({ cameraDetectResults }) => {
  console.log('AppMarkerList');
  return (
    <div>
      {cameraDetectResults?.map((cameraDetectResult) => (
        <div key={cameraDetectResult.id}>
          <Marker
            latitude={cameraDetectResult.latitude}
            longitude={cameraDetectResult.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <Room style={{ frontsize: '14px', color: 'red' }} />
          </Marker>
          <Popup latitude={cameraDetectResult.latitude} longitude={cameraDetectResult.longitude} anchor="left">
            <div className="card">
              <Label>Plate Number</Label>
              <p>{cameraDetectResult.plateNumber}</p>

              <Image
                src={`data:image/png;base64, ${cameraDetectResult.photo}`}
                alt="base64 img"
                style={{ width: '150px' }}
              />
              <Label>Time</Label>
              <p>{fDateTimeSuffix(cameraDetectResult.createdAt)}</p>
            </div>
          </Popup>
        </div>
      ))}
    </div>
  );
};

export default memo(AppMarkerList);
