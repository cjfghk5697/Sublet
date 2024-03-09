import * as s from '../components/styles/SummaryBlock.styles.js'
import * as w from '../components/styles/Wrapper.style.js'
import { useEffect, useState } from "react";
import { VerifyEmailComponents } from '../components/verifyComponents/Email.js';
import { verifyStore } from '../components/store/resetPassword.js';


export default function ResetPassword() {
  const [inputs, setInputs] = useState({
    idState: '',
  })

  const [idVeriftyState, setIdVerifyState] = useState(true)
  const { idState } = inputs;
  const [checkingEmail, setCheckingEmail] = useState(false)
  const [userState, setUserState] = useState()
  const { verifyPasswordEmail } = verifyStore((state) => ({
    verifyPasswordEmail: state.verifyPasswordEmail,
  }))
  const GetOneUser = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/user/${idState}`

    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    await fetch(
      URL, requestOptions)
      .then(res => {
        const json = res
        if (json.ok) {
          return json.json()
        } else {
          throw new Error(`${res.status} 에러가 발생했습니다.`)
        }
      })
      .then(r => {
        console.log('r', r)
        setUserState(r)
        return true
      })
      .catch(e => {
        throw new Error(e)
      });
    return true
  }

  const inputHandle = (e) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  const onVerifyEmailHandle = async (id) => {
    await GetOneUser(id).then((response) => {
      if (response) {
        setCheckingEmail(true)
      } else {
        setIdVerifyState(false)
      }
    }
    )

  }
  return (
    <>
      <w.SecondHead>비밀번호 초기화</w.SecondHead>

      {checkingEmail ?
        <>
          {verifyPasswordEmail ?
            <div className="animate__animated animate__backInRight">
              <p>비밀번호 초기화</p>
            </ div>

            :

            <div className="animate__animated animate__backInRight">
              <s.p_normal>가입하신 이메일에 인증번호를 보냈습니다.</s.p_normal>
              <s.info_text>인증번호 6자리를 입력하세요</s.info_text>
              <VerifyEmailComponents
                email={userState.email}
                user_id={idState}
                purpose={"resetpassword"}
              />

            </ div>
          }
        </>
        :
        <div>
          <s.p_normal>아이디를 입력하세요</s.p_normal>
          <s.label for="id">Id </s.label>
          {idVeriftyState ?
            <div class="mt-2">
              <w.InputText required="" name="idState" type="text" placeholder="아이디" onChange={inputHandle} value={idState} />
            </div>
            :
            <>
              <div class="mt-2">
                <w.InputText required="" name="idState" type="text" placeholder="아이디" onChange={inputHandle} value={idState} />
              </div>
              <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                아이디가 틀렸습니다.
              </span>
            </>
          }

          <s.black_upload_button onClick={() => { onVerifyEmailHandle(idState) }}>다음</s.black_upload_button>
        </div>
      }

    </>
  )
} 
