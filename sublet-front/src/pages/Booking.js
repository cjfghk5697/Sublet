import { CalulateDate, getDateDiff, priceToString } from "../components/StaticComponents";
import { bookingPopUpStore } from "../components/store/booking";
import * as w from "../components/styles/Wrapper.style";
import * as s from "../components/styles/SummaryBlock.styles";
import { FetchReservationPost } from "../components/FetchList";
import PaymentForm from "../components/bookingComponents/Payment.js"
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, TextField } from "@mui/material";
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
    <div className="ml-4 w-4/5 items-center">
      <div>
        <w.SecondHead>기간 / 금액</w.SecondHead>
        <w.Horizon />
        <p className="text-xl font-semibold ml-2">{temp_start_day} ~ {temp_end_day} ({total_day}일)</p>
        <div>
          {total_day >= 28 && (
            <div className="ml-2 mt-4">
              <s.justify_block className="font-semibold flex justify-between">
                <p className="text-l">매월 결제 금액</p>
                <p className="text-l mr-4">{priceToString(month_pay)} 원</p>
              </s.justify_block>

              <p className="ml-2 text-sm">* 28일이 넘는 경우에는 월마다 결제합니다.</p>
              <w.Horizon />
            </div>
          )}

          <s.justify_block className="ml-2 font-bold flex justify-between">
            <p className="text-l mt-1">총 결제 금액 </p>
            <p className="text-l text-[#2478F6]">{priceToString(total_pay)} 원</p>
          </s.justify_block>
        </div>
      </div>
      <div>
        <w.SecondHead className="mt-4">결제 수단</w.SecondHead>
        {/* 카드 번호, 유효기간, vs */}
        <w.Horizon />
        <div className="mt-2 ml-4">
          <s.info_text>
            예약 확정 전에는 요금이 청구되지 않습니다.
          </s.info_text>
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
                  <div className="mt-2">
                    <form className="bg-white border-solid border-2 border-gray-200 rounded px-8 pt-1 pb-8 mb-4">

                      <TextField id="standard-size-small" size="small" label="성함" variant="standard"></TextField>
                      <div className='mt-2'></div>
                      <TextField id="standard-size-small" size="small" label="계좌번호" variant="standard"></TextField>

                    </form>
                  </div>
                )
                :
                (
                  <div>
                    <PaymentForm />
                  </div>
                )
            }
            <s.info_text className="mt-2">
              <s.input_checkbox type="checkbox" checked={checkState} onChange={checkHandled} />

              체크박스를 클릭하시면 이체를 완료하셨음을 동의하는 것입니다.
            </s.info_text>
          </Box>
        </div>
      </div >
      <div>
        <w.SecondHead className="mt-4">규칙 / 정책</w.SecondHead>
        <w.Horizon />
        <div className="mt-2 ml-4">
          <s.info_text className="mt-2">
            • {total_refund_date} 전까지 무료로 취소하실 수 있습니다. <br />
            • {part_refund_date} 전에 취소하면 부분 환불을 받으실 수 있습니다.<br />
            <br />
            •  훌륭한 게스트가 되기 위한 몇 가지 간단한 규칙을 지켜주실 것을 모든 게스트에게 당부드리고 있습니다.<br />
            1. 숙소 이용규칙을 준수하세요.<br />
            2. 호스트의 집도 자신의 집처럼 아껴주세요.<br />
            3. 아래 버튼을 선택하면 호스트가 설정한 숙소 이용규칙, 게스트에게 적용되는 기본 규칙, 에어비앤비 재예약 및 환불 정책에 동의하며, 피해에 대한 책임이 본인에게 있을 경우 에어비앤비가 결제 수단으로 청구의 조치를 취할 수 있다는 사실에 동의하는 것입니다.

          </s.info_text>
        </div>
        <div className="mt-4" fullWidth>
          {
            checkState ? (<s.black_upload_button onClick={handlePostReservation}>예약하기</s.black_upload_button>
            ) :
              (<s.black_upload_button_disabled disabled>예약하기</s.black_upload_button_disabled>
              )
          }
        </div>
      </div >
    </div>
  )
}