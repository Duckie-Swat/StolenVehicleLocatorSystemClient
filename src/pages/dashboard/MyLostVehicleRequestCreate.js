import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import MyLostVehicleRequestNewEditForm from '../../sections/@dashboard/my-lost-vehicles/MyLostVehicleRequestNewEditForm';

// ----------------------------------------------------------------------

export default function MyLostVehicleRequestCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  const currentMyLostVehicleRequest = _userList.find((camera) => paramCase(camera.name) === name);

  return (
    <Page title="camera: Create a lost vehicle request">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new lost vehicle request' : 'Edit lost vehicle request'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'lost vehicle requests', href: PATH_DASHBOARD.myLostVehicles.list },
            { name: !isEdit ? 'New lost vehicle request' : capitalCase(name) },
          ]}
        />

        <MyLostVehicleRequestNewEditForm isEdit={isEdit} currentMyLostVehicleRequest={currentMyLostVehicleRequest} />
      </Container>
    </Page>
  );
}
