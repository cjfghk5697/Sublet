import { FormControl } from 'react-bootstrap';
import {
  Horizon,
  NormalText,
  SecondHead,
} from '@components/styles/Public.styles';
import {
  Box,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

export const BookPaymentForm = ({ paySelect, onPaySelectHandle }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">결제 수단</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={paySelect}
        label="Payment Method"
        onChange={onPaySelectHandle}>
        <MenuItem value={'account'}>계좌</MenuItem>
        <MenuItem value={'card'}>카드</MenuItem>
      </Select>
    </FormControl>
  );
};
