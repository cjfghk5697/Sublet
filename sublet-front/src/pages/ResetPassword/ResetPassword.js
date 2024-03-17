import * as s from '../components/styles/Public.styles.js';
import { useState } from 'react';
import { VerifyEmailComponents } from '../components/verifyComponents/Email.js';
import { verifyStore } from '../components/store/resetPassword.js';
import { FetchChangePassword } from '../components/FetchList.js';
import { Alert, FailAlert } from '../components/StaticComponents.js';
import { useNavigate } from 'react-router-dom';
import { InputPassword } from '../components/styles/Input.styles.js';
import { InputVerificationNumber } from './components/InputVerificationNumber.js';
import { InputResetPassword } from './components/InputResetPassword.js';

export default function ResetPassword() {
  const [inputs, setInputs] = useState({
    idState: '',
    passwordState: '',
  });
  const [successState, setSuccessState] = useState(false);
  const [failState, setFailState] = useState(false);
  const [idVeriftyState, setIdVerifyState] = useState(true);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const { idState, passwordState } = inputs;
  const [userInfo, setUserInfo] = useState();
  const { verifyPasswordEmail, setVerifyPasswordEmail } = verifyStore(
    state => ({
      verifyPasswordEmail: state.verifyPasswordEmail,
      setVerifyPasswordEmail: state.setVerifyPasswordEmail,
    }),
  );
  const navigate = useNavigate();

  const inputHandle = e => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onChangePassword = () => {
    FetchChangePassword(userInfo.user_id, passwordState)
      .then(res => notFoundError(res, true, setSuccessState))
      .then(() => {
        setVerifyPasswordEmail();
        navigate(`/`);
      })
      .catch(raiseError('FetchChangePassword', true, setFailState));
  };
  return (
    <>
      <s.SecondHead>비밀번호 초기화</s.SecondHead>

      {checkingEmail ? (
        <>
          {verifyPasswordEmail ? (
            <InputResetPassword
              inputHandle={inputHandle}
              passwordState={passwordState}
              onChangePassword={onChangePassword}
            />
          ) : (
            <InputVerificationNumber email={userInfo.email} idState={idState} />
          )}
        </>
      ) : (
        <>
          <s.NormalText>아이디를 입력하세요</s.NormalText>
          <s.Label for="id">Id </s.Label>

          <InputId
            idVeriftyState={idVeriftyState}
            inputHandle={inputHandle}
            idState={idState}
            FetchGetOneUser={FetchGetOneUser}
            setUserInfo={setUserInfo}
            setCheckingEmail={setCheckingEmail}
            setIdVerifyState={setIdVerifyState}
          />
        </>
      )}
      <div className="clear-both">
        {successState && <Alert />}
        {failState && <FailAlert />}
      </div>
    </>
  );
}
