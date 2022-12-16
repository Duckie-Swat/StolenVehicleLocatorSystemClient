import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Checkbox, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import axios from '../../../../utils/axios';
import { fDateTime } from '../../../../utils/formatTime';
// components
import Iconify from '../../../../components/Iconify';
import Label from '../../../../components/Label';
import { TableMoreMenu } from '../../../../components/table';
import lostVehicleRequestStatusConstants from '../../../../constants/lostVehicleRequestStatusConstants';
import { markLostVehicleRequestStatus } from '../../../../redux/slices/lostVehicleRequest';

// ----------------------------------------------------------------------

MyLostVehicleRequestTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function MyLostVehicleRequestTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { plateNumber, vehicleType, location, createdAt, lastUpdatedAt, status } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/v1/users/my-account/lost-vehicle-requests/${id}/status?status=${status}`);
      dispatch(markLostVehicleRequestStatus({ id, status }));
      enqueueSnackbar('Update status successfully', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Update status failed', { variant: 'error' });
    }
    handleCloseMenu();
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" noWrap>
          {plateNumber}
        </Typography>
      </TableCell>

      <TableCell align="left">{vehicleType}</TableCell>

      <TableCell align="left">{location}</TableCell>

      <TableCell align="left">{fDateTime(createdAt)}</TableCell>

      <TableCell align="left">{fDateTime(lastUpdatedAt)}</TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === lostVehicleRequestStatusConstants.PROCESSING && 'warning') ||
            (status === lostVehicleRequestStatusConstants.SUCCESS && 'success') ||
            'error'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {(status === lostVehicleRequestStatusConstants.PROCESSING && 'processing') ||
            (status === lostVehicleRequestStatusConstants.SUCCESS && 'success') ||
            'abanonded'}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              {status === lostVehicleRequestStatusConstants.PROCESSING && (
                <>
                  <MenuItem
                    onClick={() => {
                      handleUpdateStatus(row.id, lostVehicleRequestStatusConstants.ABANDONED);
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    <Iconify icon={'eva:trash-2-outline'} />
                    Abandon
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleUpdateStatus(row.id, lostVehicleRequestStatusConstants.SUCCESS);
                    }}
                    sx={{ color: 'green' }}
                  >
                    <Iconify icon={'mdi:sucess-outline'} />
                    Success
                  </MenuItem>
                </>
              )}
              {status === lostVehicleRequestStatusConstants.ABANDONED && (
                <>
                  <MenuItem
                    onClick={() => {
                      handleUpdateStatus(row.id, lostVehicleRequestStatusConstants.PROCESSING);
                    }}
                    sx={{ color: 'orange' }}
                  >
                    <Iconify icon={'mdi:sucess-outline'} />
                    Re-open
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleUpdateStatus(row.id, lostVehicleRequestStatusConstants.SUCCESS);
                    }}
                    sx={{ color: 'green' }}
                  >
                    <Iconify icon={'mdi:sucess-outline'} />
                    Success
                  </MenuItem>
                </>
              )}

              {status === lostVehicleRequestStatusConstants.SUCCESS && (
                <>
                  <MenuItem
                    onClick={() => {
                      handleUpdateStatus(row.id, lostVehicleRequestStatusConstants.ABANDONED);
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    <Iconify icon={'eva:trash-2-outline'} />
                    Abandon
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleUpdateStatus(row.id, lostVehicleRequestStatusConstants.PROCESSING);
                    }}
                    sx={{ color: 'orange' }}
                  >
                    <Iconify icon={'mdi:sucess-outline'} />
                    Re-open
                  </MenuItem>
                </>
              )}

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
