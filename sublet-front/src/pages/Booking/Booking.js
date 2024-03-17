import { bookingPopUpStore } from '@components/store/bookingPopUpStore';
import { BookPriceAndDate } from './Components.js/Info/BookPriceAndDate';
import { BookRefundRule } from './Components.js/Info/BookRefundRule';
import { BookPaymentMethod } from './Components.js/Info/BookPaymentMethod';

export default function Booking(userId) {
  useTitle('예약하기 | ItHome');
  const { startDay, endDay, dayPay, totalPay, postKey } = bookingPopUpStore(
    state => ({
      startDay: state.startDay,
      endDay: state.endDay,
      dayPay: state.dayPay,
      totalPay: state.totalPay,
      postKey: state.postKey,
    }),
  );

  const handlePostReservation = () => {
    const confirmStartDay = new Date(startDay).toISOString();
    const confirmEndDay = new Date(endDay).toISOString();
    FetchReservationPost(
      userId,
      postKey,
      confirmStartDay,
      confirmEndDay,
      dayPay,
    );
  };

  const totalRefundDate = CalulateDate(startDay, -7);
  const partRefundDate = CalulateDate(startDay, -3);

  const [paySelect, setPaySelect] = useState('account');
  const onPaySelectHandle = e => {
    setPaySelect(e.target.value);
  };
  const [checkState, setCheckState] = useState(false);

  const checkHandled = () => {
    setCheckState(!checkState);
  };

  const totalDay = getDateDiff(startDay, endDay);
  const monthPay = dayPay * 28;
  return (
    <div className="ml-4 w-4/5 items-center">
      <BookPriceAndDate
        startDay={startDay}
        endDay={endDay}
        totalDay={totalDay}
        totalPay={totalPay}
        monthPay={monthPay}
      />
      <BookPaymentMethod
        paySelect={paySelect}
        onPaySelectHandle={onPaySelectHandle}
        checkState={checkState}
        checkHandled={checkHandled}
      />
      <BookRefundRule
        totalRefundDate={totalRefundDate}
        partRefundDate={partRefundDate}
        checkState={checkState}
        handlePostReservation={handlePostReservation}
      />
    </div>
  );
}
