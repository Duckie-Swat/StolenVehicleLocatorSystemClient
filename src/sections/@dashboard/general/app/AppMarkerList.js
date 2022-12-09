import { Marker, Popup } from 'react-map-gl';
import React, { memo, useEffect } from 'react';
import { Room } from '@material-ui/icons';
import { fDateTimeSuffix } from '../../../../utils/formatTime';
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import { MAPBOX_API } from '../../../../config';
import axios from '../../../../utils/axios';

const AppMarkerList = ({ cameraDetectResults }) => {
  const [address, setAddress] = React.useState('');
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${cameraDetectResults[0].longitude},${cameraDetectResults[0].latitude}.json?access_token=${MAPBOX_API}`
        );
        setAddress(response.data.features[0].place_name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAddress();
  }, [cameraDetectResults]);

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
                src={`data:image/jpeg;base64,${cameraDetectResult.photo}`}
                alt="base64 img"
                style={{ width: '150px' }}
              />
              <Label>Position</Label>
              <p
                style={{
                  width: '300px',
                }}
              >
                {address}
              </p>
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
