import { useState } from "react"
import * as w from "../styles/Wrapper.style"
import * as s from "../styles/SummaryBlock.styles.js"
import { Alert } from "../StaticComponents"
import { VerifyEmail, VerifyUser } from "../FetchList.js"



export function VerifyEmailComponents({ email }) {


  const [numberState, setNumberState] = useState(0)
  const [backUp, setBackUp] = useState(false)
  const [activeVerify, setActiveVerify] = useState(false)

  const numberChange = (e) => {
    if (e.target.value > 6) {
      e.target.value
        = e.target.value.substr(0, 6);
    }
    setNumberState(e.target.value)

  }
  const verifyEmailHandle = () => {
    VerifyEmail({ email: email })
    setActiveVerify(true)
  }
  const verifyEmailHandleAgain = () => {
    VerifyEmail({ email: email })
  }
  const numberHandled = () => {

    const res = VerifyUser({ method: 'email', tokenKey: email, verifyToken: (numberState) })

    if (res) {
      setBackUp(true)
      setTimeout(() => {
        setBackUp(false)
      }, 5000);
    } else {
      console.log('틀렸습니다')
    }
  };
  return (
    <>

      {activeVerify ?
        (
          <div>
            <form>
              <w.InputText maxlength='6' type="number" onChange={numberChange} value={numberState} placeholder="인증번호 6자리를 입력하세요" required />
            </form>

            <div className='mt-4'>
              {numberState.toString().length < 6 ?
                (
                  <s.black_upload_button_disabled disabled>
                    인증하기
                  </s.black_upload_button_disabled>
                ) :
                (
                  <s.black_upload_button onClick={numberHandled} disabled>
                    인증하기
                  </s.black_upload_button>)
              }


              <s.black_upload_button onClick={verifyEmailHandleAgain} >
                다시 발송하기
              </s.black_upload_button>
              <div>
                {backUp && (
                  <Alert />
                )}
              </div>
            </div>

          </div>
        ) :
        (
          <s.black_upload_button onClick={verifyEmailHandle}>
            인증번호 발송하기
          </s.black_upload_button>
        )

      }
    </>
  )
}
