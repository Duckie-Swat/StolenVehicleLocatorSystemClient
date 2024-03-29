import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';

import { Box, Card, Grid, Stack } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// components
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { LOST_VEHICLE_REQUEST_ENDPOINT } from '../../../constants/apiEndpointConstants';
import locationConstants from '../../../constants/locationConstants';
import vehicleTypeConstants from '../../../constants/vehicleTypeConstants';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

MyLostVehicleRequestNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentMyLostVehicleRequest: PropTypes.object,
};

export default function MyLostVehicleRequestNewEditForm({ isEdit, currentMyLostVehicleRequest }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const NewMyLostVehicleRequestSchema = Yup.object().shape({
    plateNumber: Yup.string().required('Plate Number is required'),
    vehicleType: Yup.string().required('Vehicle Type is required'),
    location: Yup.string().required('Location is required'),
  });

  const defaultValues = useMemo(
    () => ({
      userId: user?.id || '',
      plateNumber: currentMyLostVehicleRequest?.plateNumber || '',
      vehicleType: currentMyLostVehicleRequest?.vehicleType || '',
      latitude: currentMyLostVehicleRequest?.latitude || '',
      longitude: currentMyLostVehicleRequest?.longitude || '',
      location: currentMyLostVehicleRequest?.location || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentMyLostVehicleRequest]
  );

  const methods = useForm({
    resolver: yupResolver(NewMyLostVehicleRequestSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentMyLostVehicleRequest) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentMyLostVehicleRequest]);

  const onSubmit = () => {
    // TODO FIX THIS

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          await axios.post(LOST_VEHICLE_REQUEST_ENDPOINT, {
            ...values,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          reset();
          enqueueSnackbar(!isEdit ? 'Request created success!' : 'Update success!');
          navigate(PATH_DASHBOARD.camera.list);
        } catch (error) {
          enqueueSnackbar(!isEdit ? 'Request created fail!' : 'Update fail!', { variant: 'error' });
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="plateNumber" label="Plate Number" />

              <RHFSelect name="vehicleType" label="Vehicle Type" placeholder="Vehicle Type">
                <option value="" />
                {vehicleTypeConstants.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect name="location" label="Location" placeholder="Location">
                <option value="" />
                {locationConstants.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Request Lost Vehicle' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
