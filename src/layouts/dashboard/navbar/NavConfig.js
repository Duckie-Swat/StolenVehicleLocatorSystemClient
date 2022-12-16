// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components

import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  dashboard: getIcon('ic_dashboard'),
  myLostVehicles: getIcon('ic_my_lost_vehicles'),
  camera: getIcon('ic_camera'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [{ title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard }],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // CAMERAS
      {
        title: 'My Cameras',
        path: PATH_DASHBOARD.camera.root,
        icon: ICONS.camera,
        children: [
          { title: 'list', path: PATH_DASHBOARD.camera.list },
          { title: 'create', path: PATH_DASHBOARD.camera.new },
        ],
      },

      // Lost Vehicle Request
      {
        title: 'My Lost Vehicles',
        path: PATH_DASHBOARD.myLostVehicles.root,
        icon: ICONS.myLostVehicles,
        children: [
          { title: 'list', path: PATH_DASHBOARD.myLostVehicles.list },
          { title: 'create', path: PATH_DASHBOARD.myLostVehicles.new },
        ],
      },
    ],
  },
];

export default navConfig;
