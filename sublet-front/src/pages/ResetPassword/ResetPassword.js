import { useState } from 'react';
import { verifyStore } from '@shared/components/Popup/store/resetPassword.js';
import { FetchChangePassword } from '@shared/components/FetchList/FetchList.js';
import { Alert, FailAlert, notFoundError, raiseError } from '@shared/components/StaticComponents/StaticComponents.js';
import { useNavigate } from 'react-router-dom';
import { InputVerificationNumber } from './components/InputVerificationNumber.js';
import { InputResetPassword } from './components/InputResetPassword.js';
import { Label, NormalText, SecondHead } from '@shared/components/styles/Public.styles.js';
import { InputId } from './components/InputId.js';

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
  console.log(userInfo)
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
      <SecondHead>비밀번호 초기화</SecondHead>

      {userInfo && checkingEmail ? (
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
          <NormalText>아이디를 입력하세요</NormalText>
          <Label for="id">Id </Label>

          <InputId
            idVeriftyState={idVeriftyState}
            inputHandle={inputHandle}
            idState={idState}
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
