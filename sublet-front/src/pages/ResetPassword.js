import * as s from '../components/styles/SummaryBlock.styles.js'
import * as w from '../components/styles/Wrapper.style.js'
import { useState } from "react";
import { VerifyEmailComponents } from '../components/verifyComponents/Email.js';
import { verifyStore } from '../components/store/resetPassword.js';
import { ChangePassword } from '../components/FetchList.js';
import { Alert, FailAlert } from '../components/StaticComponents.js';
import { useNavigate } from 'react-router-dom';


export default function ResetPassword() {
  const [inputs, setInputs] = useState({
    idState: '',
    passwordState: ''
  })
  const [successState, setSuccessState] = useState(false)
  const [failState, setFailState] = useState(false)
  const [idVeriftyState, setIdVerifyState] = useState(true)
  const [checkingEmail, setCheckingEmail] = useState(false)
  const { idState, passwordState } = inputs;
  const [userState, setUserState] = useState()
  const { verifyPasswordEmail, setVerifyPasswordEmail } = verifyStore((state) => ({
    verifyPasswordEmail: state.verifyPasswordEmail,
    setVerifyPasswordEmail: state.setVerifyPasswordEmail
  }))
  const navigate = useNavigate();

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

  const moveHome = () => { // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
    navigate(`/`);
  };
  const onChangePassword = async () => {
    await ChangePassword({ user_id: userState.user_id, new_password: passwordState })
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
          moveHome()
        }
      })
  }
  return (
    <>
      <w.SecondHead>비밀번호 초기화</w.SecondHead>

      {checkingEmail ?
        <>
          {verifyPasswordEmail ?
            <div className="animate__animated animate__backInRight">
              <s.p_normal>초기화할 비밀번호를 입력하세요.</s.p_normal>
              <div class="mt-2">
                <w.InputText required="" name="passwordState" type="password" placeholder="비밀번호" onChange={inputHandle} value={passwordState} />
              </div>
              <s.black_upload_button onClick={onChangePassword}>다음</s.black_upload_button>
            </div>

            :

            <div className="animate__animated animate__backInRight">
              <s.p_normal>인증번호 6자리를 입력하세요</s.p_normal>
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