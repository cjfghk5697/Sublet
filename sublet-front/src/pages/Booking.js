import { CalulateDate, getDateDiff, priceToString } from "../components/StaticComponents";
import { bookingPopUpStore } from "../components/store/booking";
import * as w from "../components/styles/Wrapper.style";
import * as b from "../components/styles/Booking.styles"
import * as s from "../components/styles/SummaryBlock.styles";
import { FetchReservationPost } from "../components/FetchList";
import PaymentForm from "../components/Payment"
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/material";
import { useTitle } from "../components/hook/HookCollect"

export default function Booking(user_id) {
  useTitle("예약하기 | Sublet")
  const { temp_start_day, temp_end_day, day_pay, total_pay, post_key } = bookingPopUpStore((state) => ({
    temp_start_day: state.temp_start_day,
    temp_end_day: state.temp_end_day,
    day_pay: state.day_pay,
    total_pay: state.total_pay,
    post_key: state.post_key,
  }))

  const handlePostReservation = () => {
    const start_day = new Date(temp_start_day).toISOString()
    const end_day = new Date(temp_end_day).toISOString()
    FetchReservationPost(user_id, post_key, start_day, end_day, day_pay)
  }

  const total_refund_date = CalulateDate(temp_start_day, -7)
  const part_refund_date = CalulateDate(temp_start_day, -3)

  const [paySelect, setPaySelect] = useState('account')
  const onPaySelectHandle = (e) => {
    setPaySelect(e.target.value)
  }
  const [checkState, setCheckState] = useState(false)

  const checkHandled = () => {
    setCheckState(!checkState)
  }

  const total_day = getDateDiff(temp_start_day, temp_end_day)
  const month_pay = day_pay * 28
  return (
    <div className="ml-4 w-4/5">
      <div>
        <w.SecondHead>기간 / 금액</w.SecondHead>
        <w.Horizon />
        <p className="text-xl font-semibold ml-2">{temp_start_day} ~ {temp_end_day} ({total_day}일)</p>
        <div>
          {total_day >= 28 && (
            <div className="ml-2 mt-2">
              <b.justifyBlock className="font-semibold flex justify-between">
                <p className="text-l">매월 결제 금액</p>
                <p className="text-l mr-4">{priceToString(month_pay)} 원</p>
              </b.justifyBlock>

              <p className="ml-2 text-sm">* 28일이 넘는 경우에는 월마다 결제합니다.</p>
              <w.Horizon />
              {/* 
              <b.justifyBlock className="font-bold flex justify-between">
                <p className="text-xl mt-1">총 결제 금액 </p>
                <p className="text-xl text-[#2478F6]">{priceToString(total_pay)} 원</p>
              </b.justifyBlock> */}
            </div>
          )}

          <b.justifyBlock className="ml-2 font-bold flex justify-between">
            <p className="text-l mt-1">총 결제 금액 </p>
            <p className="text-l text-[#2478F6]">{priceToString(total_pay)} 원</p>
          </b.justifyBlock>
        </div>
      </div>
      <div>
        <w.SecondHead className="mt-4">결제 수단</w.SecondHead>
        {/* 카드 번호, 유효기간, vs */}
        <w.Horizon />
        <b.infoText>
          예약 확정 전에는 요금이 청구되지 않습니다.
        </b.infoText>
        <Box
          className="mt-4 mx-9"
          justifyContent="center"
          alignItems="center"
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">결제 수단</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paySelect}
              label="Payment Method"
              onChange={onPaySelectHandle}
            >
              <MenuItem value={"account"}>계좌</MenuItem>
              <MenuItem value={"card"}>카드</MenuItem>
            </Select>
          </FormControl>
          {
            paySelect === "account" ?
              (
                <div>
                  <s.input_text type="text" placeholder="성함"></s.input_text>
                  <s.input_text type="text" placeholder="송금 계좌번호"></s.input_text>
                </div>
              )
              :
              (
                <div>
                  <PaymentForm />
                </div>
              )
          }
          <b.infoText className="mt-2">
            <s.input_checkbox type="checkbox" checked={checkState} onChange={checkHandled} />

            체크박스를 클릭하시면 이체를 완료하셨음을 동의하는 것입니다.
          </b.infoText>
        </Box>
      </div >
      <div>
        <w.SecondHead className="mt-4">규칙 / 정책</w.SecondHead>
        <w.Horizon />
        <b.infoText>
          • {total_refund_date} 전까지 무료로 취소하실 수 있습니다. <br />
          • {part_refund_date} 전에 취소하면 부분 환불을 받으실 수 있습니다.<br />
          <br />
          •  훌륭한 게스트가 되기 위한 몇 가지 간단한 규칙을 지켜주실 것을 모든 게스트에게 당부드리고 있습니다.<br />
          1. 숙소 이용규칙을 준수하세요.<br />
          2. 호스트의 집도 자신의 집처럼 아껴주세요.<br />
          3. 아래 버튼을 선택하면 호스트가 설정한 숙소 이용규칙, 게스트에게 적용되는 기본 규칙, 에어비앤비 재예약 및 환불 정책에 동의하며, 피해에 대한 책임이 본인에게 있을 경우 에어비앤비가 결제 수단으로 청구의 조치를 취할 수 있다는 사실에 동의하는 것입니다.

        </b.infoText>
      </div>
      {
        checkState ? (<s.black_upload_button onClick={handlePostReservation}>예약하기</s.black_upload_button>
        ) :
          (<s.black_upload_button_disabled onClick={handlePostReservation} disabled>예약하기</s.black_upload_button_disabled>
          )
      }
    </div >
  )
}