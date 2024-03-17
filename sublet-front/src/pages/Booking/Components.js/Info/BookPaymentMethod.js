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
import { FormControl } from 'react-bootstrap';
import PaymentForm from '../Pay/Payment';

export const BookPaymentMethod = ({
  paySelect,
  onPaySelectHandle,
  checkState,
  checkHandled,
}) => {
  return (
    <>
      <SecondHead className="mt-4">결제 수단</SecondHead>
      {/* 카드 번호, 유효기간, vs */}
      <Horizon />
      <div className="mt-2 ml-4">
        <NormalText>예약 확정 전에는 요금이 청구되지 않습니다.</NormalText>
        <Box className="mt-4 mx-9" justifyContent="center" alignItems="center">
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
          {paySelect === 'account' ? (
            <div className="mt-2">
              <form className="bg-white border-solid border-2 border-gray-200 rounded px-8 pt-1 pb-8 mb-4">
                <TextField
                  id="standard-size-small"
                  size="small"
                  label="성함"
                  variant="standard"></TextField>
                <div className="mt-2"></div>
                <TextField
                  id="standard-size-small"
                  size="small"
                  label="계좌번호"
                  variant="standard"></TextField>
              </form>
            </div>
          ) : (
            <div>
              <PaymentForm />
            </div>
          )}
          <NormalText className="mt-2">
            <Checkbox
              type="checkbox"
              checked={checkState}
              onChange={checkHandled}
            />
            체크박스를 클릭하시면 이체를 완료하셨음을 동의하는 것입니다.
          </NormalText>
        </Box>
      </div>
    </>
  );
};
