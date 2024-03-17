import { DialogForm } from 'components/Popup';
import { ReservationByPostKeyInfo } from '../Info/ReservationByPostKeyInfo';
import { DialogContent } from '@mui/material';

export const PostReservationDialog = ({
  onChange,
  reservationDialogShow,
  key,
}) => {
  return (
    <DialogForm
      openState={reservationDialogShow}
      handleClose={onChange}
      name="reservationDialogShow"
      render={() => (
        <label
          htmlFor="test"
          className="block mb-2 text-sm font-medium text-gray-900 float-left">
          test
        </label>
      )}>
      <DialogContent sx={{ width: 512 }} className="text-left">
        <ReservationByPostKeyInfo postKey={key} />
      </DialogContent>
    </DialogForm>
  );
};
