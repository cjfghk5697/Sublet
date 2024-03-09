import { useState } from "react"
import * as w from "../styles/Wrapper.style"
import * as s from "../styles/SummaryBlock.styles.js"
import { Alert, FailAlert } from "../StaticComponents"
import { ResetPassword, VerifyEmail, VerifyUser } from "../FetchList.js"
import { verifyStore } from "../store/resetPassword.js"



export function VerifyEmailComponents({ email,
  user_id,
  purpose = "verifyemail" }) {
  const { setVerifyPasswordEmail, verifyPasswordEmail } = verifyStore((state) => ({
    setVerifyPasswordEmail: state.setVerifyPasswordEmail,
    verifyPasswordEmail: state.verifyPasswordEmail
  }))
  const [numberState, setNumberState] = useState(0)
  const [successState, setSuccessState] = useState(false)
  const [failState, setFailState] = useState(false)
  const [activeVerify, setActiveVerify] = useState(false)
  const numberChange = (e) => {
    if (e.target.value > 6) {
      e.target.value
        = e.target.value.substr(0, 6);
    }
    setNumberState(e.target.value)

  }
  const verifyEmailHandle = () => {
    console.log(VerifyEmail({ email: email }))
    setActiveVerify(true)
  }
  const verifyEmailHandleAgain = () => {
    VerifyEmail({ email: email })
  }

  const numberHandled = () => {
    if (purpose === "verifyemail") {
      VerifyUser({ method: 'email', tokenKey: email, verifyToken: numberState })
        .then(response => {
          if (!response.ok) {
            // create error object and reject if not a 2xx response code
            let err = new Error("HTTP status code: " + response.status)
            err.response = response
            err.status = response.status
            setFailState(true)
            setTimeout(() => {
              setFailState(false)
            }, 5000);
          } else {
            setSuccessState(true)
            setTimeout(() => {
              setSuccessState(false)
            }, 5000);
            setVerifyPasswordEmail()
          }
        })
        .catch((err) => {
          setFailState(true)
          setTimeout(() => {
            setFailState(false)
          }, 5000);
        })
    } else if (purpose === "resetpassword") {
      ResetPassword({ user_id: user_id, tokenKey: email, verifyToken: numberState })
        .then(response => {
          console.log(response)
          if (!response.ok) {
            // create error object and reject if not a 2xx response code
            let err = new Error("HTTP status code: " + response.status)
            err.response = response
            err.status = response.status
            setFailState(true)
            setTimeout(() => {
              setFailState(false)
            }, 5000);
          } else {
            setSuccessState(true)
            setTimeout(() => {
              setSuccessState(false)
            }, 5000);

          }
        })
        .catch((err) => {
          setFailState(true)
          setTimeout(() => {
            setFailState(false)
          }, 5000);
        })
    }
  };

  return (
    <>

      {activeVerify ?
        (
          <div>
            <form>
              <w.InputText maxLength='6' type="tel" onChange={numberChange} value={numberState} placeholder="인증번호 6자리를 입력하세요" required />
            </form>

            <div className='mt-4'>
              {numberState.toString().length < 6 ?
                (
                  <s.black_upload_button_disabled disabled>
                    인증하기
                  </s.black_upload_button_disabled>
                ) :
                (
                  <s.black_upload_button onClick={numberHandled}>
                    인증하기
                  </s.black_upload_button>)
              }


              <s.black_upload_button onClick={verifyEmailHandleAgain} >
                다시 발송하기
              </s.black_upload_button>

            </div>

          </div>
        ) :
        (
          <s.black_upload_button onClick={verifyEmailHandle}>
            인증번호 발송하기
          </s.black_upload_button>
        )

      }
      <div className="clear-both">
        {successState && (
          <Alert />
        )}
        {failState && (
          < FailAlert />
        )}
      </div>
    </>
  )
}
