// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components

import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
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
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.camera.list },
          { title: 'create', path: PATH_DASHBOARD.camera.new },
        ],
      },

      // Lost Vehicle Request
      {
        title: 'My Lost Vehicles',
        path: PATH_DASHBOARD.myLostVehicles.root,
        icon: ICONS.cart,
        children: [
          { title: 'list', path: PATH_DASHBOARD.myLostVehicles.list },
          { title: 'create', path: PATH_DASHBOARD.myLostVehicles.new },
        ],
      },
    ],
  },
];

export default navConfig;
